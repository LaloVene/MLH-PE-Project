import { useState, useContext } from "react";
import {
  IonCardContent,
  IonCol,
  IonModal,
  IonButton,
  useIonAlert,
  IonSelect,
  IonSelectOption,
  IonChip,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import {
  Card,
  CardHeader,
  Icon,
  SmallIcon,
  Username,
  Title,
  Date,
  Description,
  ProjTitle,
  Owner,
  TagTitle,
  TitleInput,
  DescriptionInput,
  LinkInput,
  TagsWrapper,
  ModalContent,
  ModalContentView,
  ButtonsWrapper,
} from './ProjectCard.styles'
import { SelectButtonRow } from './PageComponents.styles';
import ProjectTags from './ProjectTags.component'
import { personCircleOutline } from "ionicons/icons";
import { useJwt } from "react-jwt";
import GlobalContext from "../utils/state/GlobalContext";
import { LRButton } from './LR.styles'
import dbtopics from "../utils/topics.json";
import dblanguages from "../utils/languages.json";
import { open, checkmark, create, trash, close } from 'ionicons/icons';

function EditableProjectCard(props) {
  const { title, description, date, url, owner, id, editFunc, languages, topics, collabs } = props;

  const [editMode, setEditMode] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [eTitle, setTitle] = useState(title);
  const [eDescription, setDescription] = useState(description);
  const [eUrl, setUrl] = useState(url);

  const [eTopics, setTopics] = useState(topics);
  const [eLanguages, setLanguages] = useState(languages);
  const [eCollab, setCollab] = useState("");

  const [present] = useIonAlert();
  const { state } = useContext(GlobalContext);
  const { decodedToken } = useJwt(state.token);

  function closeEdit() {
    setShowProject(false)
    setEditMode(false)
    // don't save changes
    setTitle(title)
    setDescription(description)
    setUrl(url)
  }

  function handleDelete() {
    return (
      present({
        header: 'Delete',
        message: 'Delete project?',
        buttons: [
          { text: 'Cancel', handler: () => console.log('ok pressed') },
          { text: 'Confirm', handler: () => deleteProject() }
        ],
        onDidDismiss: () => console.log('did dismiss'),
      })
    )
  }

  function deleteProject() {

    let opts = {
      "id": id,
      "owner": decodedToken.username
    }

    fetch('/api/deleteProject', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(opts)
    }).then(r => r.json())
      .then(resp => console.log(resp))
      .then(() => {
        setShowProject(false)
        setEditMode(false)
        editFunc((Math.random() + 1).toString(36).substring(7))
      })
  }

  function saveChanges() {
    let opts = {
      "id": id,
      "title": eTitle,
      "description": eDescription,
      "url": eUrl,
    }

    languages?.forEach(function (lang) {
      fetch('/api/deleteProjectLanguage', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'language': lang,
          'projectId': id
        })
      }).then(r => r.json())
        .then(resp => {

          if (resp.status === "ok") {
            console.log(resp.message)
          }
          else {
            console.log(resp.error)
          }
        })
    })
    topics?.forEach(function (topic) {
      fetch('/api/deleteProjectTopic', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'topic': topic,
          'projectId': id
        })
      }).then(r => r.json())
        .then(resp => {

          if (resp.status === "ok") {
            console.log(resp.message)
          }
          else {
            console.log(resp.error)
          }
        })
    })
    eLanguages ? eLanguages.forEach(function (lang) {
      fetch('/api/addProjectLanguage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'language': lang,
          'projectId': id
        })
      }).then(r => r.json())
        .then(resp => {

          if (resp.status === "ok") {
            console.log(resp.message)
          }
          else {
            console.log(resp.error)
          }
        })
    }) : languages.forEach(function (lang) {
      fetch('/api/addProjectLanguage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'language': lang,
          'projectId': id
        })
      }).then(r => r.json())
        .then(resp => {

          if (resp.status === "ok") {
            console.log(resp.message)
          }
          else {
            console.log(resp.error)
          }
        })
    })

    eTopics ? eTopics.forEach(function (topic) {
      fetch('/api/addProjectTopic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'topic': topic,
          'projectId': id
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
    }) : topics.forEach(function (topic) {
      fetch('/api/addProjectTopic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'topic': topic,
          'projectId': id
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
    fetch('/api/editProject', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(opts)
    }).then(r => r.json())
      .then(resp => {
        setShowProject(false)
        setEditMode(false)
        editFunc((Math.random() + 1).toString(36).substring(7))
        if (resp.status === "ok") {
          console.log("Edit Successful")
        }
        else {
          console.log(resp.error)
        }
      })
  }

  function deleteUser(username) {
    fetch('/api/deleteUserInProject', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'username': username,
        'projectId': id
      })
    })
      .then(() => {
        editFunc((Math.random() + 1).toString(36).substring(7))
        return present({
          header: "User Removed!",
          buttons: [
            'Ok'
          ]
        })
      })
  }
  function addUser(username) {
    fetch('/api/addUserInProject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'username': username,
        'projectId': id
      })
    })
      .then(() => {
        editFunc((Math.random() + 1).toString(36).substring(7))
        return present({
          header: "User Added!",
          buttons: [
            'Ok'
          ]
        })
      })
  }
  function checkUser() {
    console.log(eCollab)

    fetch(`/api/getUserData?username=${eCollab}`)
      .then(res => res.json())
      .then(resp => {
        console.log(resp)
        if (resp.userData) {
          addUser(eCollab)
          setCollab("")

        } else {
          return present({
            header: "Invalid Username!",
            buttons: [
              'Ok'
            ]
          })
        }
      })
  }

  return (
    <IonCol size="12" size-md="4" key={id}>
      {!editMode &&
        <IonModal id="projmod" isOpen={showProject}>
          <ModalContent>
            <ModalContentView>
              <ProjTitle >{title}</ProjTitle>
              <Owner>Created by: {owner}</Owner>
              <Date>{date}</Date>
              <Description >{description}</Description>
              <TagsWrapper>

                <ProjectTags title="Languages" tagType={languages} />
                <ProjectTags title="Tags" tagType={topics} />
                <ProjectTags title="Collaborators" tagType={collabs} />

              </TagsWrapper>
              <ButtonsWrapper>

                <LRButton
                  style={{ marginLeft: "-8px" }}
                  onClick={() => {
                    const fullURL = eUrl.match(/^https?:/) ? eUrl : '//' + eUrl
                    window.open(fullURL)
                  }}>
                  <SmallIcon slot="start" icon={open} />
                  Github
                </LRButton>

                <IonButton id="closemodal" color="secondary" onClick={() => setEditMode(true)}>
                  <SmallIcon slot="start" icon={create} />
                  Edit
                </IonButton>
                <IonButton style={{ marginBottom: "50px" }} id="closemodal" onClick={() => setShowProject(false)}>
                  <SmallIcon slot="start" icon={close} />
                  Close
                </IonButton>
              </ButtonsWrapper>
            </ModalContentView>
          </ModalContent>

        </IonModal>}

      {editMode &&
        <IonModal id="projmod" isOpen={showProject}>
          <ModalContent>
            <TitleInput
              value={eTitle}
              placeholder="Title"
              onIonChange={(e) => {
                setTitle(e.target.value)
              }}
              type="text"
              maxlength={25}
            />

            <DescriptionInput
              value={eDescription}
              placeholder="Description"
              onIonChange={(e) => {
                setDescription(e.target.value)
              }}
              type="text"
              rows={5}
              minlength={60}
              maxlength={200}
            />

            <LinkInput
              placeholder="Github Link"
              value={eUrl}
              onIonChange={(e) => setUrl(e.target.value)}
              type="text"
              rows={1}
              maxlength={47}
            />

            <TagTitle>Collaborators</TagTitle>

            {collabs ? collabs.map(collab =>
            (<IonChip key={collab} onClick={() => deleteUser(collab)}>
              <IonLabel>
                {collab}
              </IonLabel>
              <IonIcon icon={close} />
            </IonChip>))
              : <div />}

            <SelectButtonRow >
              <LinkInput style={{ maxWidth: "55%", marginTop: "0px" }}
                placeholder="Collaborator Username"
                value={eCollab}
                onIonChange={(e) => setCollab(e.target.value)}
                type="text"
                rows={1}
                maxlength={47}
              />
              <IonButton style={{ margin: "20px" }} onClick={() => checkUser("add")}>
                Add User
              </IonButton>
            </SelectButtonRow>

            <TagTitle>Languages</TagTitle>
            <IonSelect style={{ height: "40px", width: "500px", marginLeft: "20px" }} value={eLanguages ? eLanguages : languages} multiple={true} cancelText="Close" okText="Done" placeholder="Select language(s)"
              onIonChange={e => (setLanguages(e.target.value))}>
              {
                dblanguages.map(lang =>
                  <IonSelectOption key={lang} value={lang}>{lang}</IonSelectOption>
                )
              }
            </IonSelect>

            <TagTitle>Tags</TagTitle>
            <IonSelect style={{ height: "40px", width: "500px", marginLeft: "20px" }} value={eTopics ? eTopics : topics} multiple={true} cancelText="Close" okText="Done" placeholder="Select tag(s)"
              onIonChange={e => (setTopics(e.target.value))}>
              {
                dbtopics.map(topic =>
                  <IonSelectOption key={topic} value={topic}>{topic}</IonSelectOption>
                )
              }
            </IonSelect>



            <ButtonsWrapper>
              <IonButton color="success" id="closemodal" style={{ width: "200px" }} onClick={saveChanges}>
                <SmallIcon slot="start" icon={checkmark} />
                Save
              </IonButton>
              <IonButton color="danger" id="closemodal" style={{ width: "200px" }} onClick={handleDelete}>
                <SmallIcon slot="start" icon={trash} />
                Delete
              </IonButton>
              <IonButton style={{ marginBottom: "50px", width: "200px" }} id="closemodal" onClick={closeEdit}>
                <SmallIcon slot="start" icon={close} />
                Close
              </IonButton>
            </ButtonsWrapper>
          </ModalContent>
        </IonModal>
      }

      <Card onClick={() => setShowProject(true)}>
        <CardHeader>
          <Icon icon={personCircleOutline} />
          <Username>{owner}</Username>
        </CardHeader>
        <IonCardContent>
          <Title>{title}</Title>
          <Description>{description.length < 100 ? description : description.slice(0, 100) + "..."}</Description>
          <Date style={{ textAlign: "right" }}>{date}</Date>

          <ProjectTags title="Languages" tagType={languages} limit={true} />
          <ProjectTags title="Tags" tagType={topics} limit={true} />
          <ProjectTags title="Collaborators" tagType={collabs} limit={true} />

        </IonCardContent>
      </Card>
    </IonCol >
  );
}


export default EditableProjectCard;
