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
import projects from "../utils/projects.json";
import categories from "../utils/categories.json";
import './Projects.css';

const Container = styled.div`
  padding: 1rem;
`;
const Separator = styled.div`
  margin: 3rem 0;
`;

const Card = styled(IonCard)`
  cursor: pointer;
  border-radius: 2rem;
  background-color: #EEF1FA;
  box-shadow: none;
  
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


    // need to figure out CORS
    // const [projects,setProjects]=useState([]);
    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch("http://lalovene.duckdns.org:5000/api/getProjects", {

    //             mode: 'no-cors'

    //         });
    //         const data = await response.json();
    //         setProjects(data.projects)
    //         console.log(data.projects)
    //         console.log(data.projects[0].descrit)

    //     }

    // }, [setProjects]);

    function saveChanges() {
        setShowProject(false)
        // send new project to backend missing owners


        // let opts = {
        //     'title': eTitle,
        //     'description': eDescription,
        //     'url': eUrl,
        //     // 'owner':owner
        // }
        // fetch('http://lalovene.duckdns.org:5000/api/addProject', {
        //     method: 'post',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(opts)
        // }).then(r => r.json())
        //     .then(resp => {
        //         console.log(resp)

        //     })
    }



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
                    {/* Add Project
                    <section>
                        <SectionTitle>Add Project</SectionTitle>
                        <Card>
                            <Icon icon={addCircleOutline} />
                        </Card>
                    </section> */}
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
                                            <IonInput id="eTitle"
                                                placeholder="Title"
                                                value={eTitle}
                                                onIonChange={(e: { detail: { value: any; }; }) => setTitle(e.detail.value!)}

                                                type="text"
                                            ></IonInput>
                                        </IonItem>
                                        <textarea id="desarea"
                                            placeholder="Description"
                                            value={eDescription}
                                            onChange={(
                                                ev: React.ChangeEvent<HTMLTextAreaElement>
                                            ): void => setDescription(ev.target.value)}



                                        ></textarea>



                                        <IonButton id="closemodal" onClick={saveChanges}>Save</IonButton>

                                        <IonButton style={{ marginBottom: "50px" }} id="closemodal" onClick={() => setShowProject(false)}>Close</IonButton>
                                    </IonModal>
                                    <Card class="ion-align-items-center ion-justify-content-center" style={{
                                        height: "93%",
                                        display: "flex",
                                        minHeight: "200px"

                                    }} onClick={() => setShowProject(true)}>
                                        <Icon icon={addCircleOutline} />
                                    </Card>
                                </IonCol>
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
                        </IonGrid>
                    </section>
                </Container>
            </IonContent>
        </IonPage >
    );
}

export default Projects;
