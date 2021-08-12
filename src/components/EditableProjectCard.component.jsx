import { useState, useContext } from "react";
import {
  IonCardContent,
  IonCol,
  IonModal,
  IonButton,
  useIonAlert,
  IonChip,
  IonSelect,
  IonSelectOption,
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
  TagText,
  TagTitle,
  TitleInput,
  DescriptionInput,
  LinkInput,
  TagsWrapper,
  ModalContent,
  ModalContentView,
  ButtonsWrapper
} from './ProjectCardStyles'
import ProjectTags from './ProjectTags'
import { personCircleOutline } from "ionicons/icons";
import { useJwt } from "react-jwt";
import GlobalContext from "../utils/state/GlobalContext";
import '../pages/Projects.css';
import { LRButton } from '../components/LRStyles'
import dbtopics from "../utils/topics.json";
import dblanguages from "../utils/languages.json";
import { open, checkmark, create, trash, close } from 'ionicons/icons';

function EditableProjectCard(props) {
  const { title, description, date, url, owner, id, editFunc } = props;

  const [editMode, setEditMode] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [eTitle, setTitle] = useState(title);
  const [eDescription, setDescription] = useState(description);
  const [eUrl, setUrl] = useState(url);
  const [eTopics, setTopics] = useState([""]);
  const [eLanguages, setLanguages] = useState([""]);
  const [eCollaborators, setCollaborators] = useState([""]);

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
        editFunc(id.toString())
      })
  }

  function saveChanges() {
    let opts = {
      "id": id,
      "title": eTitle,
      "description": eDescription,
      "url": eUrl,
    }

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
        editFunc(eTitle)
        if (resp.status === "ok") {
          console.log("Edit Successful")
        }
        else {
          console.log(resp.error)
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
                <ProjectTags title="Languages" tagType={eLanguages} />
                <ProjectTags title="Tags" tagType={eTopics} />
                <ProjectTags title="Collaborators" tagType={eCollaborators} />

              </TagsWrapper>
              <ButtonsWrapper>

                <LRButton onClick={() => {
                  const fullURL = eUrl.match(/^https?:/) ? eUrl : '//' + eUrl
                  window.open(fullURL)
                }}>
                  <SmallIcon slot="start" icon={open} />
                  More Information
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
              maxlength={30}
            />

            <DescriptionInput
              value={eDescription}
              placeholder="Description"
              onIonChange={(e) => {
                setDescription(e.target.value)
              }}
              type="text"
              rows={10}
              maxlength={470}
            />

            <LinkInput
              placeholder="Link"
              value={eUrl}
              onIonChange={(e) => setUrl(e.target.value)}
              type="text"
              rows={1}
              maxlength={47}
            />

            <TagTitle>Languages</TagTitle>
            <IonSelect style={{ height: "40px", width: "500px", marginLeft: "20px" }} value={eLanguages} multiple={true} cancelText="Close" okText="Done" placeholder="Select language(s)"
              onIonChange={e => (setLanguages(e.target.value))}>
              {
                dblanguages.map(topic =>
                  <IonSelectOption value={topic}>{topic}</IonSelectOption>
                )
              }
            </IonSelect>

            <TagTitle>Tags</TagTitle>
            <IonSelect style={{ height: "40px", width: "500px", marginLeft: "20px" }} value={eTopics} multiple={true} cancelText="Close" okText="Done" placeholder="Select tag(s)"
              onIonChange={e => (setTopics(e.target.value))}>
              {
                dbtopics.map(topic =>
                  <IonSelectOption value={topic}>{topic}</IonSelectOption>
                )
              }
            </IonSelect>

            <TagTitle>Collaborators</TagTitle>
            <IonSelect style={{ height: "40px", width: "500px", marginLeft: "20px" }} value={eCollaborators} multiple={true} cancelText="Close" okText="Done" placeholder="Manage collaborator(s)"
              onIonChange={e => (setCollaborators(e.target.value))}>
              {/* CHANGE THIS to users */}
              {
                dbtopics.map(topic =>
                  <IonSelectOption value={topic}>{topic}</IonSelectOption>
                )
              }
            </IonSelect>


            <ButtonsWrapper>
              <IonButton color="success" id="closemodal" onClick={saveChanges}>
                <SmallIcon slot="start" icon={checkmark} />
                Save
              </IonButton>
              <IonButton color="danger" id="closemodal" style={{ background: "red" }} onClick={handleDelete}>
                <SmallIcon slot="start" icon={trash} />
                Delete
              </IonButton>
              <IonButton style={{ marginBottom: "50px" }} id="closemodal" onClick={closeEdit}>
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
          <Description>{description}</Description>
          <Date style={{ textAlign: "right" }}>{date}</Date>

          <ProjectTags title="Languages" tagType={eLanguages} limit={true} />
          <ProjectTags title="Tags" tagType={eTopics} limit={true} />
          <ProjectTags title="Collaborators" tagType={eCollaborators} limit={true} />

        </IonCardContent>
      </Card>
    </IonCol >
  );
}

export default EditableProjectCard;
