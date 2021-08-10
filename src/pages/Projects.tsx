import React, { useEffect, useState } from "react";
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
    IonButton,
    IonCard,
    IonIcon,
    IonGrid,
    IonItem
} from "@ionic/react";
import styled from "styled-components";
import { addCircleOutline } from "ionicons/icons";
import SectionTitle from "../components/SectionTitle.component";
import ProjectCard from "../components/ProjectCard.component";
import EditableProjectCard from "../components/EditableProjectCard.component";
import CategoryButton from "../components/CategoryButton.component";
import Searchbar from '../components/Searchbar.component';
import Header from '../components/Header.component';
// import projects from "../utils/projects.json";
import categories from "../utils/categories.json";
import './Projects.css';

const Container = styled.div`
  padding: 1rem;
`;
const Separator = styled.div`
  margin: 3rem 0;
`;

const CreateCard = styled(IonCard)`
    cursor: pointer;
    border-radius: 2rem;
    background-color: #EEF1FA;
    box-shadow: none;

    height: 93%;
    display: flex;
    min-height: 200px;

    &:hover {
    background-color: #dfe5f5;
    }
`;

const Icon = styled(IonIcon)`
  font-size: 2.5rem;
  margin-right: 0.5rem;
`;



function Projects() {
    const [search, setSearch] = useState('')
    const [showProject, setShowProject] = useState(false);
    const [eTitle, setTitle] = useState("");
    const [eDescription, setDescription] = useState("");
    const [eUrl, setUrl] = useState("");


    const [projects, setProjects] = useState([]);
    useEffect(() => {
        fetch("/api/getProjects").then(res => res.json()).then(data => {
            setProjects(data.projects)
        })
    }, [])


    function saveChanges() {
        setShowProject(false)
        // send new project to backend missing owners

        let opts = {
            'title': eTitle,
            'description': eDescription,
            'url': eUrl,
            'owner': "mshen63"
        }
        fetch('/api/addProject', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(opts)
        }).then(r => r.json())
            .then(resp => {
                console.log(resp)

            })
        setTitle("")
        setDescription("")
        setUrl("")
    }



    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                <Container>

                    {/* Search Bar */}
                    <section>
                        <Searchbar placeholder="Search" onChange={(e: any) => setSearch(e.target.value!)} />
                    </section>


                    {/* Projects */}
                    <section>
                        <SectionTitle>Your Projects</SectionTitle>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="12" size-md="4">
                                    <IonModal id="projmod" isOpen={showProject} cssClass='my-custom-class' >
                                        <IonItem>
                                            <textarea id="eTitle"
                                                placeholder="Title"
                                                value={eTitle}
                                                // onIonChange={(e: { detail: { value: any; }; }) => setTitle(e.detail.value!)}
                                                onChange={(
                                                    ev: React.ChangeEvent<HTMLTextAreaElement>
                                                ): void => setTitle(ev.target.value)}
                                            // type="text"
                                            ></textarea>
                                        </IonItem>
                                        <textarea id="desarea"
                                            placeholder="Description"
                                            value={eDescription}
                                            onChange={(
                                                ev: React.ChangeEvent<HTMLTextAreaElement>
                                            ): void => setDescription(ev.target.value)}
                                        ></textarea>

                                        <textarea id="url"
                                            placeholder="URL"
                                            value={eUrl}
                                            onChange={(
                                                ev: React.ChangeEvent<HTMLTextAreaElement>
                                            ): void => setUrl(ev.target.value)}
                                        ></textarea>

                                        <IonButton id="closemodal" onClick={saveChanges}>Save</IonButton>
                                        <IonButton style={{ marginBottom: "50px" }} id="closemodal" onClick={() => setShowProject(false)}>Close</IonButton>
                                    </IonModal>

                                    <CreateCard class="ion-align-items-center ion-justify-content-center"
                                        onClick={() => setShowProject(true)}>
                                        <Icon icon={addCircleOutline} />
                                    </CreateCard>
                                </IonCol>
                                {projects ? projects.map((project, index) => {
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
                                }) : <div></div>}

                            </IonRow>
                        </IonGrid>
                    </section>
                </Container>
            </IonContent>
        </IonPage >
    );
}

export default Projects;
