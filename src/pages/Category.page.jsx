import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonButtons,
  IonBackButton
} from "@ionic/react";
import styled from "styled-components";
import Searchbar from '../components/Searchbar.component';
import ProjectCard from '../components/ProjectCard.component';
import NotFound from '../components/NotFound.component';
import { useProjects } from "../utils/hooks/useProject";

const Container = styled.div`
  padding: 1rem;
`;
const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 300;
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
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/categories"/>
          </IonButtons>
          <IonTitle>Category</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Category</IonTitle>
          </IonToolbar>
        </IonHeader>

        <Container>
          <Title>{categoryName}</Title>
          <SearchBarContainer>
            <Searchbar placeholder="Search" onChange={onChange} onSubmit={Search}/>
          </SearchBarContainer>
          {
            state.data?.projects?.length &&
            <IonRow>
              {
                state.data.projects.map((project) => {
                  const { id, title, description, date, url, owner } = project;
                  return (
                    <IonCol size="12" size-md="4" key={id}>
                      <ProjectCard
                        title={title}
                        description={description}
                        date={date}
                        url={url}
                        owner={owner}
                      />
                    </IonCol>
                  );
                })
              }
            </IonRow>
          }
          {
            !state.data?.projects?.length &&
            <NotFound />
          }
        </Container>
      </IonContent>
    </IonPage>
  );
}

export default Category;
