import { IonContent, useIonAlert, IonGrid, IonPage, IonRow, IonIcon, IonButton, IonModal, IonSelect, IonSelectOption } from '@ionic/react';
import {
  Icon,
  TagTitle,
  TitleInput,
  DescriptionInput,
  LinkInput,
  ModalContent,
  ModalContentView,
  ButtonsWrapper,
  SmallIcon
} from '../components/ProjectCardStyles';
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components'
import ProjectCard from "../components/ProjectCard.component";
import Profile from '../components/Profile';
import Tag from '../components/Tag';
import Header from '../components/Header.component';
import NotFound from '../components/NotFound.component';
import GlobalContext from "../utils/state/GlobalContext";
import { useJwt } from "react-jwt";
import { pencilOutline, close, checkmark } from 'ionicons/icons';
// import { EditProfileDetails } from '../components/EditLanguagesInterests';
import dbtopics from "../utils/topics.json";
import dblanguages from "../utils/languages.json";
import SectionTitle from '../components/SectionTitle.component';

const Title = styled.h4`
    margin-bottom: 12px;
    margin-top: 36px;
    text-align: center;
    font-weight: bold;
`;

const Wrapper = styled.div`
    max-width: 1200px;
    margin: auto;
    padding: 1rem;
`;

const Section = styled.div`
    width: 50%;
    position: relative;
`
const TagSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`

const EditIcon = styled.button`
  background-color: rgba(0,0,0,0);
  color: black;
  font-size: 1.1rem;
  &:hover {
    color: grey;
  }
`;



function ProfilePage() {

  // Auth
  const { state } = useContext(GlobalContext);
  const { decodedToken } = useJwt(state.token);

  const [profileData, setProfileData] = useState([]);
  const [profileLanguages, setProfileLanguages] = useState([]);
  const [profileInterests, setProfileInterests] = useState([]);
  const [projectList, setProjectList] = useState([]);

  const [editLanguagesDetails, setEditLanguagesDetails] = useState(false);
  const [editInterestsDetails, setEditInterestsDetails] = useState(false);

  const [present] = useIonAlert();

  function saveChanges() {
    console.log('pressed save')
    if (editLanguagesDetails) {
      if (!profileLanguages) {
        return present({
          header: "Please select at least one option!",
          buttons: [
            'Ok'
          ]
        })
      } else {

        profileLanguages.forEach(function (language) {
          fetch('/api/addUserLanguage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'username': profileData.username,
              'language': language
            })
          }).then(r => r.json())
            .then(resp => {

              console.log(language)
              if (resp.status === "ok") {
                console.log(resp.message)
              }
              else {
                console.log(resp.error)
              }
            })
        })
        return present({
          header: "Languages added!",
          buttons: [
            {
              text: 'Ok', handler: (d) => {
                setEditLanguagesDetails(false)
              }
            }
          ]
        })

      }
    }
    if (editInterestsDetails) {
      if (!profileInterests) {
        return present({
          header: "Please select at least one option!",
          buttons: [
            'Ok'
          ]
        })
      } else {

        profileInterests.forEach(function (topic) {
          fetch('/api/addUserTopic', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'username': profileData.username,
              'topic': topic
            })
          }).then(r => r.json())
            .then(resp => {

              console.log(topic)
              if (resp.status === "ok") {
                console.log(resp.message)
              }
              else {
                console.log(resp.error)
              }
            })
        })
        return present({
          header: "Interests added!",
          buttons: [
            {
              text: 'Ok', handler: (d) => {
                setEditInterestsDetails(false)
              }
            }
          ]
        })

      }
    }
  }

  function EditProfileDetails() {
    return (
      <>
        <IonModal isOpen={editLanguagesDetails || editInterestsDetails}>
          <ModalContent>
            {editLanguagesDetails ?
              <>
                <div style={{ marginTop: "60px", marginBottom: "30px" }}>
                  <SectionTitle>Edit Languages</SectionTitle>
                </div>

                <IonSelect
                  style={{ height: "40px", width: "500px", marginLeft: "20px" }}
                  value={profileLanguages}
                  multiple={true}
                  cancelText="Close"
                  okText="Done"
                  placeholder="Select language(s)"
                  onIonChange={e => (setProfileLanguages(e.target.value))}>
                  {
                    dblanguages.map(language =>
                      <IonSelectOption key={language} value={language}>{language}</IonSelectOption>
                    )
                  }
                </IonSelect> </> : <></>}

            {editInterestsDetails ?
              <>
                <div style={{ marginTop: "60px", marginBottom: "30px" }}>
                  <SectionTitle>Edit Interests</SectionTitle>
                </div>

                <IonSelect
                  style={{ height: "40px", width: "500px", marginLeft: "20px" }}
                  value={profileInterests}
                  multiple={true}
                  cancelText="Close"
                  okText="Done"
                  placeholder="Select language(s)"
                  onIonChange={e => (setProfileInterests(e.target.value))}>
                  {
                    dbtopics.map(topic =>
                      <IonSelectOption key={topic} value={topic}>{topic}</IonSelectOption>
                    )
                  }
                </IonSelect> </> : <></>}

            <ButtonsWrapper>
              <IonButton color="success" id="closemodal" onClick={saveChanges}  >
                <SmallIcon slot="start" icon={checkmark} />
                Save
              </IonButton>
              <IonButton style={{ marginBottom: "50px" }} id="closemodal" onClick={() => { setEditLanguagesDetails(false); setEditInterestsDetails(false) }}>
                <SmallIcon slot="start" icon={close} />
                Close
              </IonButton>
            </ButtonsWrapper>
          </ModalContent>
        </IonModal>
      </>
    )
  }
  useEffect(() => {
    if (decodedToken) {
      fetch(`/api/getUserData?username=${decodedToken.username}`).then(res => res.json()).then(data => {
        setProfileData(data.userData)
      })
    }
  }, [decodedToken])

  useEffect(() => {
    fetch('/api/getProjects').then(res => res.json()).then(data => {
      setProjectList(data.projects);
      console.log(data.projects);
    })
  }, [])

  const placeholderBio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."

  function EditLanguages() {
    console.log(profileData.languages);
    console.log()
  }
  function EditInterests() {
    console.log('heaallo');
    console.log()
  }
  return (
    <IonPage>
      <Header />
      <IonContent>
        <Wrapper>

          {/* Profile information */}
          <Profile name={profileData.name} username={profileData.username} bio={placeholderBio} />

          {/* Languages and interests row */}
          <IonRow>
            <Section>
              <Title>
                &nbsp;&nbsp;
                Languages
                &nbsp;
                <EditIcon
                  onClick={() => setEditLanguagesDetails(true)}
                >
                  <IonIcon slot="icon-only" icon={pencilOutline} />
                </EditIcon>
                <EditProfileDetails />
              </Title>
              <TagSection>
                {profileData.languages ? profileData.languages.map(language => <Tag key={language.name} text={language.name} />) : <div />}
              </TagSection>
            </Section>
            <Section>
              <Title>
                &nbsp;&nbsp;
                Interests
                &nbsp;
                <EditIcon
                  onClick={() => setEditInterestsDetails(true)}
                >
                  <IonIcon slot="icon-only" icon={pencilOutline} />
                </EditIcon>
              </Title>
              <TagSection>
                {profileData.topics ? profileData.topics.map(topic => <Tag key={topic.name} text={topic.name} />) : <div />}
              </TagSection>
            </Section>
          </IonRow>

          {/* Projects section */}
          <Title>
            Projects
          </Title>
          <IonGrid>
            {
              projectList.filter(project => project.owner === profileData.username).length ?
                <IonRow>
                  {projectList.filter(project => project.owner === profileData.username).map(project => {
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
                  })}
                </IonRow>
                :
                <NotFound title="No Projects" message="You don't have projects yet" />
            }
          </IonGrid>

        </Wrapper>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
