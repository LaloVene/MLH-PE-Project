  
import { useState, useEffect, useReducer } from 'react';

const BASE_URL = '/api/getProjects';

function useProjects() {
  const [url, setUrl] = useState(BASE_URL);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: null,
  });

  const changeUrl = (params) => {
    setUrl(BASE_URL + params);
  }

  function dataFetchReducer(state, action) {
    switch (action.type) {
      case 'FETCH_INIT':
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case 'FETCH_SUCCESS':
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
          lang: action.languages,
          top:action.topics,
          us:action.users
        };
      case 'FETCH_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      default:
        throw new Error();
    }
  }

  useEffect(() => {
    
    async function fetchData() {
      // For test purposes
      // if (true) {
      //   dispatch({ type: 'FETCH_SUCCESS', payload: Data });
      //   return;
      // }
      dispatch({ type: 'FETCH_INIT' });
      try {
        const response = await fetch(url);
        const data = await response.json();

        var langdict={}
				var topdict={}
        var userdict={}
				for (var proj in data.projects) {
					
					let id=data.projects[proj].id;
					await Promise.all([
						fetch('/api/getProjectLanguages', {
							method: 'POST',
							headers: {
							'Content-Type': 'application/json'
							},
							body: JSON.stringify({"projectId":id})
						}),
						fetch('/api/getProjectTopics', {
							method: 'POST',
							headers: {
							'Content-Type': 'application/json'
							},
							body: JSON.stringify({"projectId":id})
						}),
						fetch('/api/getUsersInProject', {
							method: 'POST',
							headers: {
							'Content-Type': 'application/json'
							},
							body: JSON.stringify({"projectId":id})
						})
						]).then(responses =>
						Promise.all(responses.map(response => response.json()))
						).then(data =>{
						const languages = []
						for (var lang in data[0].languages){
							languages.push(data[0].languages[lang].language)
						}
						langdict[id]=languages
          
						const topics = []
						for (var top in data[1].topics){
							topics.push(data[1].topics[top].topic)
						}
						topdict[id]=topics

						const users = []
						for (var us in data[2].users){
							users.push(data[2].users[us].username)
						}
						userdict[id]=users
						
						})
					}

					
					
							

					

        
        console.log(userdict);
        dispatch({ type: 'FETCH_SUCCESS', payload: data,topics:topdict,languages:langdict ,users:userdict});
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE' });
        // console.error('Bad data: ', error);
      }
    }

    if ( url !== BASE_URL ) fetchData();
  }, [url]);

  return [state, changeUrl];
}

export { useProjects };