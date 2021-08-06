import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonInput,
  IonSearchbar
} from "@ionic/react";
import styled from "styled-components";
import SectionTitle from "../components/SectionTitle.component";
import ProjectCard from "../components/ProjectCard.component";
import CategoryButton from "../components/CategoryButton.component";
import projects from "../utils/projects.json";
import categories from "../utils/categories.json";

const Container = styled.div`
  padding: 1rem;
`;
const Separator = styled.div`
  margin: 3rem 0;
`;

function Home() {
  const [search, setSearch] = useState('')

  // const [currentTime, setCurrentTime] = useState(0);

  // useEffect(() => {
  //   fetch("/api/time")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCurrentTime(data.time);
  //     });
  // }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Container>
          {/* Search Bar */}
          <section>
            <IonSearchbar value={search} onIonChange={e => setSearch(e.detail.value!)}></IonSearchbar>
          </section>

          {/* Categories */}
          <section>
            <SectionTitle>Explore by Category</SectionTitle>
            {categories.slice(0, 4).map((category) => (
              <CategoryButton key={category.name}>
                {category.name}
              </CategoryButton>
            ))}
          </section>

          <Separator />

          {/* Projects */}
          <section>
            <SectionTitle>Recommended for You</SectionTitle>
            <IonRow>
              {projects.map((project, index) => {
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
              })}
            </IonRow>
          </section>
        </Container>
      </IonContent>
    </IonPage>
  );
}

export default Home;
