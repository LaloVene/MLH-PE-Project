import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  IonContent,
  IonPage,
  IonRow,
  IonCol,
} from "@ionic/react";
import Header from '../components/Header.component';
import Searchbar from '../components/Searchbar.component';
import CategoryCard from '../components/CategoryCard.component';
import SectionTitle from "../components/SectionTitle.component";
import { PageContainer, SearchBarContainer } from '../components/PageComponentStyles';

function Categories() {

  const [categories, setCategories] = useState([]);
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
      <Header />
      <IonContent fullscreen>

        <PageContainer>
          <SectionTitle>
            Categories
          </SectionTitle>

          <SearchBarContainer>
            <Searchbar placeholder="Search" onChange={Search} onSubmit={() => { }} />
          </SearchBarContainer>
          <IonRow>
            {
              filteredCategories.map(category =>
                <IonCol size="6" size-md="3" key={category.name}>
                  <Link style={{ textDecoration: "none" }} to={`/category/${category.name}`}>
                    <CategoryCard
                      name={category.name}
                    />
                  </Link>
                </IonCol>
              )
            }
          </IonRow>
        </PageContainer>
      </IonContent>
    </IonPage >
  );
}

export default Categories;
