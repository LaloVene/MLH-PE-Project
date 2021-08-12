import React, { useEffect, useState, useContext } from "react";
import {
    IonModal,
    IonContent,
    IonPage,
    IonRow,
    IonCol,
    IonButton,
    IonCard,
    IonIcon,
    IonGrid,
    IonItem,
    useIonAlert
} from "@ionic/react";
import styled from "styled-components";
import { addCircleOutline } from "ionicons/icons";
import SectionTitle from "../components/SectionTitle.component";
import EditableProjectCard from "../components/EditableProjectCard.component";
import Searchbar from '../components/Searchbar.component';
import Header from '../components/Header.component';
import { useJwt } from "react-jwt";
import GlobalContext from "../utils/state/GlobalContext";
import './Projects.css';

const Container = styled.div`
  padding: 1rem;
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
    const [mTitle, setMTitle] = useState("");
    const [mDescription, setMDescription] = useState("");
    const [mUrl, setMUrl] = useState("");
    const [edited, setEdited] = useState("");
    const [projects, setProjects] = useState([]);

    const { state } = useContext(GlobalContext);
    const { decodedToken } : {decodedToken: any} = useJwt(state.token);
    const [present] = useIonAlert()

    useEffect(() => {
        if (decodedToken) {
            fetch("/api/getProjects").then(res => res.json()).then(data => {
                const projs = data.projects.filter((proj: { owner: any; }) => proj.owner === decodedToken?.username)
                setProjects(projs)
            })
        }
    }, [decodedToken, edited])

    function saveChanges() {  
        if (!mTitle || !mDescription||!mUrl){
            return present({
                header: "Please fill out all the fields!",
                buttons: [
                  'Ok'
                ]
              })
        } else{
            let opts = {
                'title': mTitle,
                'description': mDescription,
                'url': mUrl,
                'owner': decodedToken.decodedToken.username
            }
            fetch('/api/addProject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(opts)
            }).then(r => r.json())
                .then(resp => {
                    console.log(resp)
                    
                    
                }).then(()=>{return present({
                    header: "Project created!",
                    buttons: [
                      {text:'Ok', handler:(d)=>{
                        setShowProject(false)
                        setMTitle("")
                        setMDescription("")
                        setMUrl("")
                        setEdited(mTitle)
                      }}
                    ]
                  })})
        }
        
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
                                            <textarea id="mTitle"
                                                placeholder="Title"
                                                value={mTitle}
                                                // onIonChange={(e: { detail: { value: any; }; }) => setMTitle(e.detail.value!)}
                                                onChange={(
                                                    ev: React.ChangeEvent<HTMLTextAreaElement>
                                                ): void => setMTitle(ev.target.value)}
                                            // type="text"
                                            ></textarea>
                                        </IonItem>
                                        <textarea id="desarea"
                                            placeholder="Description"
                                            value={mDescription}
                                            onChange={(
                                                ev: React.ChangeEvent<HTMLTextAreaElement>
                                            ): void => setMDescription(ev.target.value)}
                                        ></textarea>

                                        <textarea id="url"
                                            placeholder="URL"
                                            value={mUrl}
                                            onChange={(
                                                ev: React.ChangeEvent<HTMLTextAreaElement>
                                            ): void => setMUrl(ev.target.value)}
                                        ></textarea>

                                        <IonButton id="closemodal" onClick={saveChanges}>Save</IonButton>
                                        <IonButton style={{ marginBottom: "50px" }} id="closemodal" onClick={() => setShowProject(false)}>Close</IonButton>
                                    </IonModal>

                                    <CreateCard class="ion-align-items-center ion-justify-content-center"
                                        onClick={() => setShowProject(true)}>
                                        <Icon icon={addCircleOutline} />
                                    </CreateCard>
                                </IonCol>
                                {projects ? projects.map((project: any) => {
                                    const { id, title, description, date, url, owner } = project;
                                    return (
                                        <EditableProjectCard
                                            key={id}
                                            title={title}
                                            description={description}
                                            date={date}
                                            url={url}
                                            owner={owner}
                                            id={id}
                                            editFunc={setEdited}
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
