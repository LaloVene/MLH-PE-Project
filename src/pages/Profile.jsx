import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ProjectCard from '../components/ProjectCard';
import Profile from '../components/Profile';
import './Register.css';
import styled from 'styled-components'
import Tag from '../components/Tag';
import { useEffect, useState } from 'react';

const Title = styled.h4`
    margin-bottom: 20px;
`;

const Wrapper = styled.div`
    max-width: 1200px;
    margin: auto;
`;

const Section = styled.div`
    width: 50%;
    position: relative;
`
const TagSection = styled.div`
    display: flex;
`

const Row = styled.div`
    display: flex;
`

function ProfilePage() {
  
  const [profileData, setProfileData] = useState([]);
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {

      fetch('/api/getUserData?username=test').then(res => res.json()).then(data => {
        setProfileData(data.userData)
      })
  }, [])

  useEffect(() => {

      fetch('/api/getProjects').then(res => res.json()).then(data => {
        setProjectList(data.projects)
      })    
  }, [])


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Wrapper>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Profile</IonTitle>
            </IonToolbar>
          </IonHeader>
          <Profile name={profileData.name} username={profileData.username} bio="Profile bio" />
          <Row>
            <Section>
              <Title>
                Languages
              </Title>
              <TagSection>
                {profileData.languages ? profileData.languages.map(language => <Tag text={language.name} />) : <div />}
              </TagSection>
            </Section>
            <Section>
              <Title>
                Interests
              </Title>
              <TagSection>
                {profileData.topics ? profileData.topics.map(topic => <Tag text={topic.name} />) : <div />}
              </TagSection>
            </Section>
          </Row>
          <Title>
            Projects
          </Title>

          <IonGrid>
            <IonRow>
              {projectList?.filter(project => project.owner === profileData.username).map(project => <ProjectCard username={project.owner} title={project.title} description={project.description}/>)}
            </IonRow>
          </IonGrid>
        </Wrapper>


      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;