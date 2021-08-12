import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  IonContent,
  IonPage,
  IonRow,
} from "@ionic/react";
import styled from "styled-components";
import SectionTitle from "../components/SectionTitle.component";
import ProjectCard from "../components/ProjectCard.component";
import CategoryButton from "../components/CategoryButton.component";
import Searchbar from '../components/Searchbar.component';
import Header from '../components/Header.component';
import NotFound from '../components/NotFound.component';
import './Home.css';

const Container = styled.div`
  padding: 1rem;
`;
const Separator = styled.div`
  margin: 3rem 0;
`;

function Home() {
  const [search, setSearch] = useState('');
  const [projectList, setProjectList]: any = useState([]);
  const [categories, setCategories]: any = useState([]);
  const [filteredProjects, setFilteredProjects]: any = useState([]);
  const [tops, setTops]:any=useState([])
  const [langs, setLangs]:any=useState([])

  useEffect(() => {
    fetch('/api/getProjects').then(res => res.json()).then(async data => {
      setProjectList(data.projects);
      console.log(data.projects);
      var langdict=new Map<any,any[]>();
      var topdict=new Map<any,any[]>();
      for (var proj in data.projects) {
        let id: string;
        id=data.projects[proj].id;
        console.log(id)
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
              })
            ]).then(responses =>
              Promise.all(responses.map(response => response.json()))
            ).then(data =>{
              const languages = []
              for (var lang in data[0].languages){
                languages.push(data[0].languages[lang].language)
              }
              langdict.set(id,languages)
          
              const topics = []
              for (var top in data[0].topics){
                topics.push(data[0].topics[top].topic)
              }
              topdict.set(id,topics)
              
            })
      }
      setTops(topdict)
      setLangs(langdict)
    
    })})

  // useEffect(()=>{
  //   for (var proj in projectList){
  //     const{id}=proj
  //   }
  //   Promise.all([
  //     fetch('/api/getProjectLanguages', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({"projectId":id})
  //     }),
  //     fetch('/api/getProjectTopics', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({"projectId":id})
  //     })
  //   ]).then(responses =>
  //     Promise.all(responses.map(response => response.json()))
  //   ).then(data =>{
  //     const languages = []
  //     for (var lang in data[0].languages){
  //       languages.push(data[0].languages[lang].language)
  //     }
  //     setLanguages(languages)
  
  //     const topics = []
  //     for (var top in data[0].topics){
  //       topics.push(data[0].topics[top].topic)
  //     }
  //     setTopics(topics)
      
  //   })
  // },[projectList])

  useEffect(() => {
    let filteredProjects = projectList;
    if (search) {
      filteredProjects = projectList.filter((p: any) => {
        return p.title.toLowerCase().includes(search.toLowerCase());
      });
    }
    setFilteredProjects(filteredProjects);
  }, [search, projectList]);

  

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "/api/getTopics"
      );
      const data = await response.json();
      setCategories(data.topics);
    }
    fetchData();
  }, [setCategories]);

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <Container>
          {/* Search Bar */}
          <section>
            <Searchbar
              placeholder="Search"
              onChange={(e: any) => setSearch(e.target.value!)}
            />
          </section>

          {/* Categories */}
          <section>
            <SectionTitle>Explore by Category</SectionTitle>
            {categories.slice(0, 4).map((category: any) => (
              <Link to={`/category/${category.name}`}>
                <CategoryButton key={category.name}>
                  {category.name}
                </CategoryButton>
              </Link>
            ))}
          </section>

          <Separator />

          {/* Projects */}
          <section>
            <SectionTitle>
              {search ? "Search Results" : "Recommended for You"}
            </SectionTitle>
            <IonRow>
              {filteredProjects.map((project: any) => {
                  const { id, title, description, date, url, owner } = project;
                  
                  
                  console.log(langs)
                  console.log(tops)
                    return (
                      <ProjectCard
                        title={title}
                        description={description}
                        date={date}
                        url={url}
                        owner={owner}
                        id={id}
                        languages={langs[id]}
                        topics={tops[id]}
                      />
                    );
              })}

            </IonRow>
            {!filteredProjects.length && <NotFound title="No match"/>}
          </section>
        </Container>
      </IonContent>
    </IonPage>
  );
}

export default Home;
