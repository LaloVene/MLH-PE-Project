import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    IonModal,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonRow,
    IonCol,
    IonInput,
    IonSearchbar,
    IonButton
} from "@ionic/react";
import styled from "styled-components";
import SectionTitle from "../components/SectionTitle.component";
import ProjectCard from "../components/ProjectCard.component";
import EditableProjectCard from "../components/EditableProjectCard.component";
import CategoryButton from "../components/CategoryButton.component";
import Searchbar from '../components/Searchbar.component';
import projects from "../utils/projects.json";
import categories from "../utils/categories.json";
import './Projects.css';

const Container = styled.div`
  padding: 1rem;
`;
const Separator = styled.div`
  margin: 3rem 0;
`;

function Projects() {
    const [search, setSearch] = useState('')




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
                        <Searchbar placeholder="Search" onChange={(e: any) => setSearch(e.target.value!)} />
                    </section>



                    {/* Projects */}
                    <section>
                        <SectionTitle>Your Projects</SectionTitle>
                        <IonRow>
                            {projects.filter(proj => proj.description.toLowerCase().includes(search.toLowerCase()) || proj.title.toLowerCase().includes(search.toLowerCase())).map((project, index) => {
                                const { id, title, description, date, url, owner } = project;
                                return (
                                    <EditableProjectCard
                                        title={title}
                                        description={description}
                                        date={date}
                                        url={url}
                                        owner={owner}
                                        id={id}
                                    />

                                );
                            })}
                        </IonRow>
                    </section>
                </Container>
            </IonContent>
        </IonPage >
    );
}

export default Projects;
