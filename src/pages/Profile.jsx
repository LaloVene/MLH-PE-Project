import { IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components'
import ProjectCard from "../components/ProjectCard.component";
import Profile from '../components/Profile';
import Tag from '../components/Tag';
import Header from '../components/Header.component';
import NotFound from '../components/NotFound.component';
import GlobalContext from "../utils/state/GlobalContext";
import { useJwt } from "react-jwt";


const Title = styled.h4`
    margin-bottom: 12px;
    margin-top: 36px;
    text-align: center;
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

const Row = styled.div`
    display: flex;
`

function ProfilePage() {

  // Auth
  const {state} = useContext(GlobalContext);
  const { decodedToken } = useJwt(state.token);

  const [profileData, setProfileData] = useState([]);
  const [projectList, setProjectList] = useState([]);

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


  return (
    <IonPage>
      <Header/>
      <IonContent>
        <Wrapper>

          {/* Profile information */}
          <Profile name={profileData.name} username={profileData.username} bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />

          {/* Languages and interests row */}
          <Row>
            <Section>
              <Title>
                Languages
              </Title>
              <TagSection>
                {profileData.languages ? profileData.languages.map(language => <Tag key={language.name} text={language.name} />) : <div />}
              </TagSection>
            </Section>
            <Section>
              <Title>
                Interests
              </Title>
              <TagSection>
                {profileData.topics ? profileData.topics.map(topic => <Tag key={topic.name} text={topic.name} />) : <div />}
              </TagSection>
            </Section>
          </Row>

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
                  <NotFound title="No Projects" message="You don´t have projects yet"/>
              }
          </IonGrid>

        </Wrapper>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
