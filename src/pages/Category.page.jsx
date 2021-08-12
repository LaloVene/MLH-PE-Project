import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonButtons,
  IonBackButton
} from "@ionic/react";
import styled from "styled-components";
import Searchbar from '../components/Searchbar.component';
import ProjectCard from '../components/ProjectCard.component';
import NotFound from '../components/NotFound.component';
import { useProjects } from "../utils/hooks/useProject";
import './Home.css';
import Header from '../components/Header.component';
import SectionTitle from "../components/SectionTitle.component";

const Container = styled.div`
  padding: 1rem;
`;

const SearchBarContainer = styled.h1`
  max-width: 20rem;
  font-size: 1rem;
  padding-left: 1rem;
`;

function Category(props) {

  const [state, changeUrl] = useProjects();
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const categoryName = props.match.params.id;

  // Fetch categories from /api/getTopics
  useEffect(() => {
    if (searchQuery) {
      changeUrl(`?searchterm=${searchQuery}&topic=${categoryName}`);
    } else {
      changeUrl(`?topic=${categoryName}`);
    }
  }, [categoryName, searchQuery, changeUrl]);

  // const onChange = (event) => {
  //   const query = event.target.value;
  //   setSearchQuery(query);
  // }
  const onChange = (event) => {
    const query = event.target.value;
    setSearchText(query)
  }
  const Search = (event) => {
    event.preventDefault();
    setSearchQuery(searchText)
  }

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <Container>
          <SectionTitle>{categoryName}</SectionTitle>
          <SearchBarContainer>
            <Searchbar placeholder="Search" onChange={onChange} onSubmit={Search} />
          </SearchBarContainer>
          {
            state.data?.projects?.length &&
            <IonRow>
              {
                state.data.projects.map((project) => {
                  const { id, title, description, date, url, owner } = project;
                  return (
                    <ProjectCard
                      title={title}
                      description={description}
                      date={date}
                      url={url}
                      owner={owner}
                      id={id}
                      key={id}
                    />
                  );
                })
              }
            </IonRow>
          }
          {
            !state.data?.projects?.length &&
            <NotFound message="There are no projects under this category." />
          }
        </Container>
      </IonContent>
    </IonPage>
  );
}

export default Category;
