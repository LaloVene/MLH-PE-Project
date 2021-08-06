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

  useEffect(() => {

      fetch('/api/getUserData?username=test').then(res => res.json()).then(data => {
        setProfileData(data.userData)
      }).then(console.log(profileData))
    
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

                <Tag text="Python" />
                <Tag text="JavaScript" />
              </TagSection>
            </Section>
            <Section>
              <Title>
                Interests
              </Title>
              <TagSection>

                <Tag text="Machine Learning" />
                <Tag text="Algorithms" />
              </TagSection>
            </Section>
          </Row>
          <Title>
            Projects
          </Title>

          <IonGrid>
            <IonRow>
              <IonCol>
                <ProjectCard username="User1" title="Card title" description="Card description" />
              </IonCol>
              <IonCol>
                <ProjectCard username="User2" title="Card title" description="Card description" />
              </IonCol>
              <IonCol>
                <ProjectCard username="User3" title="Card title" description="Card description" />
              </IonCol>
            </IonRow>
          </IonGrid>
        </Wrapper>


      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;