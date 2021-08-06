import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
} from "@ionic/react";
import styled from "styled-components";
import Searchbar from '../components/Searchbar.component';
import CategoryCard from '../components/CategoryCard.component';
import categoriesData from '../utils/categories.json';

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

function Categories() {

  const [categories, setCategories] = useState(categoriesData);
  const [filteredCategories, setFilteredCategories] = useState(categories);
  
  // Fetch categories from /api/getTopics
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/getTopics");
      const data = await response.json();
      setCategories(data.topics)
      setFilteredCategories(data.topics)
    }
    fetchData();
    }, [setCategories, setFilteredCategories]);
  
  const Search = (event) => {
    const query = event.target.value;
    setFilteredCategories(categories.filter(category => category.name.toLowerCase().includes(query.toLowerCase())));
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Categories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Categories</IonTitle>
          </IonToolbar>
        </IonHeader>

        <Container>
          <Title>Categories</Title>
          <SearchBarContainer>
            <Searchbar placeholder="Search" onChange={Search} onSubmit={() => {}}/>
          </SearchBarContainer>
          <IonRow>
            {
              filteredCategories.map(category =>
                <IonCol size="6" size-md="3">
                  <Link to={`/category/${category.name}`}>
                    <CategoryCard
                      key={category.name}
                      name={category.name}
                      />
                  </Link>
                </IonCol>
              )
            }
          </IonRow>
        </Container>
      </IonContent>
    </IonPage>
  );
}

export default Categories;
