import React from "react";
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
import CategoryCard from '../components/CategoryCard.component';
import categories from '../utils/categories.json';

const Container = styled.div`
  padding: 1rem;
`;
const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 300;
`;

function Categories() {

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
          <IonRow>
            {
              categories.map(category =>
                <IonCol size="6" size-md="3">
                  <CategoryCard
                    key={category.name}
                    name={category.name}
                    />
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
