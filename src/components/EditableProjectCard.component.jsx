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
import { personCircleOutline } from "ionicons/icons";
import { useJwt } from "react-jwt";
import GlobalContext from "../utils/state/GlobalContext";
import '../pages/Projects.css';
import { LRButton } from '../components/LRStyles'
import dbtopics from "../utils/topics.json";
import dblanguages from "../utils/languages.json";


function EditableProjectCard(props) {
  const { title, description, date, url, owner, id, editFunc } = props;

  const [editMode, setEditMode] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [eTitle, setTitle] = useState(title);
  const [eDescription, setDescription] = useState(description);
  const [eUrl, setUrl] = useState(url);
  const [eTopics, setTopics] = useState([""]);
  const [eLanguages, setLanguages] = useState([""]);


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
        cssClass: 'my-css',
        header: 'Delete',
        message: 'Delete project?',
        buttons: [
          { text: 'Cancel', handler: (d) => console.log('ok pressed') },
          { text: 'Confirm', handler: (d) => deleteProject() }
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
      .then(resp => console.log(resp)).then(() => {
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
        console.log(resp)
        console.log(eTopics)
        console.log(eLanguages)
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

  const ProjectTags = ({ title, tagType, limit }) => {
    var showTags = tagType;
    var hiddenTagCount = 0;
    console.log(tagType)
    if (limit) {
      showTags = tagType.slice(0, 3);
      hiddenTagCount = (tagType.length - 3)
    }
    return (
      <TagText>
        <strong>{title}: </strong><br />
        {showTags != "" ? showTags.map((item) => (
          <IonChip key={item} style={{ backgroundColor: "#acc1f8" }}>{item}</IonChip>
        )) : <i>None listed</i>}
        {(limit & (hiddenTagCount > 0)) ? ("+ " + parseInt(hiddenTagCount) + " more") : ""}
      </TagText>
    )
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

              </TagsWrapper>
              <ButtonsWrapper>

                <LRButton onClick={() => {
                  const fullURL = eUrl.match(/^https?:/) ? eUrl : '//' + eUrl
                  window.open(fullURL)
                }}>
                  More Information
                </LRButton>

                <IonButton id="closemodal" onClick={() => setEditMode(true)}>Edit</IonButton>
                <IonButton style={{ marginBottom: "50px" }} id="closemodal" onClick={() => setShowProject(false)}>Close</IonButton>
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
            ></TitleInput>

            <DescriptionInput
              value={eDescription}
              placeholder="Description"
              onChange={(e) => {
                setDescription(e.target.value)
              }}>
            </DescriptionInput >

            <LinkInput
              placeholder="Link"
              value={eUrl}
              onChange={(e) => setUrl(e.target.value)}
            ></LinkInput>

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
            <ButtonsWrapper>
              <IonButton color="success" id="closemodal" onClick={saveChanges}>Save</IonButton>
              <IonButton color="danger" id="closemodal" style={{ background: "red" }} onClick={handleDelete}>Delete</IonButton>
              <IonButton style={{ marginBottom: "50px" }} id="closemodal" onClick={closeEdit}>Close</IonButton>
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

        </IonCardContent>
      </Card>

    </IonCol >

  );
}

export default EditableProjectCard;
