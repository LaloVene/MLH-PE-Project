  
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
        console.log(data);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE' });
        console.error('Bad data: ', error);
      }
    }

    if ( url !== BASE_URL ) fetchData();
  }, [url]);

  return [state, changeUrl];
}

export { useProjects };