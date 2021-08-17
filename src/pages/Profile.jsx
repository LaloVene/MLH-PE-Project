import { useIonAlert, IonGrid, IonRow, IonIcon, IonButton, IonModal, IonSelect, IonSelectOption, IonChip, IonLabel } from '@ionic/react';
import { ModalContent, ButtonsWrapper, SmallIcon } from '../components/ProjectCardStyles';
import { useEffect, useState, useContext } from 'react';
import ProjectCard from "../components/ProjectCard.component";
import Profile from '../components/Profile';
import Tag from '../components/Tag';
import NotFound from '../components/NotFound.component';
import GlobalContext from "../utils/state/GlobalContext";
import { useJwt } from "react-jwt";
import { pencilOutline, close, checkmark } from 'ionicons/icons';
import dbtopics from "../utils/topics.json";
import dblanguages from "../utils/languages.json";
import PageContainer from '../components/PageContainer';
import { SmallTitle, Section, TagSection, EditIcon, ProfileDetailsSelect } from '../components/PageComponentStyles';


function ProfilePage() {

  // Auth
  const { state } = useContext(GlobalContext);
  const { decodedToken } = useJwt(state.token);

  const [profileData, setProfileData] = useState([]);
  const [profileLanguages, setProfileLanguages] = useState([]);
  const [profileInterests, setProfileInterests] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [tops, setTops] = useState({})
  const [langs, setLangs] = useState({})
  const [users, setUsers] = useState({})

  const [editLanguagesDetails, setEditLanguagesDetails] = useState(false);
  const [editInterestsDetails, setEditInterestsDetails] = useState(false);

  const [edited, setEdited] = useState("");
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
        profileLanguages.forEach((language) => {
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
          header: "Done",
          buttons: [
            {
              text: 'Ok', handler: (d) => {
                setEditLanguagesDetails(false)
                setProfileLanguages([])
                setEdited((Math.random() + 1).toString(36).substring(7))
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
                setProfileInterests([])
                setEdited((Math.random() + 1).toString(36).substring(7))
              }
            }
          ]
        })

      }
    }
  }

  function deleteItem(item) {
    console.log(item)
    if (editLanguagesDetails) {

      fetch('/api/deleteUserLanguage', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'language': item,
          'username': profileData.username
        })
      }).then(r => r.json())
        .then(resp => {

          if (resp.status === "ok") {
            console.log(resp.message)
            setEditLanguagesDetails(false)
            setEdited({ item })
          }
          else {
            console.log(resp.error)
          }
        }
        )

    }

    if (editInterestsDetails) {
      fetch('/api/deleteUserTopic', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'topic': item,
          'username': profileData.username
        })
      }).then(r => r.json())
        .then(resp => {

          if (resp.status === "ok") {
            console.log(resp.message)
            setEditInterestsDetails(false)
            setEdited({ item })
          }
          else {
            console.log(resp.error)
          }
        })

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
                  <SmallTitle>Edit Language(s)</SmallTitle>
                </div>
                <div style={{ maxWidth: "500px", margin: "auto" }}>
                  {profileData?.languages ? profileData.languages.map(language =>
                  (<IonChip key={language.id} onClick={() => deleteItem(language.name)}>
                    <IonLabel>{language.name}</IonLabel>
                    <IonIcon icon={close} />
                  </IonChip>))
                    : <div />}
                </div>
                <ProfileDetailsSelect
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
                </ProfileDetailsSelect>
              </> : <> </>}

            {editInterestsDetails ?
              <>
                <div style={{ marginTop: "60px", marginBottom: "30px" }}>
                  <SmallTitle>Edit Interest(s)</SmallTitle>
                </div>
                <div style={{ maxWidth: "500px", margin: "auto" }}>

                  {profileData?.topics ? profileData.topics.map(topic =>
                  (<IonChip key={topic.id} onClick={() => deleteItem(topic.name)}>
                    <IonLabel>{topic.name}</IonLabel>
                    <IonIcon icon={close} />
                  </IonChip>))
                    : <div />}
                </div>
                <ProfileDetailsSelect
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
                </ProfileDetailsSelect>
              </> : <> </>}

            <ButtonsWrapper>
              <IonButton color="success" id="closemodal" onClick={saveChanges}  >
                <SmallIcon slot="start" icon={checkmark} />
                Add
              </IonButton>
            </ButtonsWrapper>

            <ButtonsWrapper>
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
  }, [decodedToken, edited])



  useEffect(() => {
    if (decodedToken) {
      fetch("/api/getProjects").then(res => res.json()).then(async data => {
        const projs = data.projects.filter((proj) => proj.owner === decodedToken?.username)
        setProjectList(projs)
        console.log(projectList)
        var langdict = {}
        var topdict = {}
        var userdict = {}


        for (var proj in data.projects) {

          let id = data.projects[proj].id;
          await Promise.all([
            fetch('/api/getProjectLanguages', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ "projectId": id })
            }),
            fetch('/api/getProjectTopics', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ "projectId": id })
            }),
            fetch('/api/getUsersInProject', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ "projectId": id })
            })
          ]).then(responses =>
            Promise.all(responses.map(response => response.json()))
          ).then(data => {
            const languages = []
            for (var lang in data[0].languages) {
              languages.push(data[0].languages[lang].language)
            }
            langdict[id] = languages

            const topics = []
            for (var top in data[1].topics) {
              topics.push(data[1].topics[top].topic)
            }
            topdict[id] = topics

            const users = []
            for (var us in data[2].users) {
              users.push(data[2].users[us].username)
            }
            userdict[id] = users

          })
        }

        setTops(topdict)
        setLangs(langdict)
        setUsers(userdict)

      })
    }
  }, [decodedToken])

  const placeholderBio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."

  return (
    <PageContainer>

      {/* Profile information */}
      <Profile name={profileData.name} username={profileData.username} bio={placeholderBio} />

      {/* Languages and interests row */}
      <IonRow>
        <Section>
          <SmallTitle>
            &nbsp;&nbsp;
            Languages
            &nbsp;
            <EditIcon
              onClick={() => setEditLanguagesDetails(true)}
            >
              <IonIcon slot="icon-only" icon={pencilOutline} />
            </EditIcon>
            <EditProfileDetails />
          </SmallTitle>
          <TagSection>
            {profileData.languages ? profileData.languages.map(language => <Tag key={language.name} text={language.name} />) : <div />}
          </TagSection>
        </Section>
        <Section>
          <SmallTitle>
            &nbsp;&nbsp;
            Interests
            &nbsp;
            <EditIcon
              onClick={() => setEditInterestsDetails(true)}
            >
              <IonIcon slot="icon-only" icon={pencilOutline} />
            </EditIcon>
          </SmallTitle>
          <TagSection>
            {profileData.topics ? profileData.topics.map(topic => <Tag key={topic.name} text={topic.name} />) : <div />}
          </TagSection>
        </Section>
      </IonRow>

      {/* Projects section */}
      <SmallTitle>
        Projects
      </SmallTitle>
      <IonGrid>
        {
          projectList?.filter(project => project.owner === profileData.username).length ?
            <IonRow>
              {projectList?.filter(project => project.owner === profileData.username).map(project => {
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
                    languages={langs[id]}
                    topics={tops[id]}
                    collabs={users[id]}
                    showContactButton={false}
                  />

                );
              })}
            </IonRow>
            :
            <NotFound title="No Projects" message="You don't have projects yet" />
        }
      </IonGrid>

    </PageContainer>

  );
};

export default ProfilePage;
