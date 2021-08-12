import React, { useState, useContext } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonIcon,
  IonCol,
  IonModal,
  IonButton,
  IonInput,
  IonItem,
  useIonAlert,
  IonChip,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import styled from "styled-components";
import { useJwt } from "react-jwt";
import GlobalContext from "../utils/state/GlobalContext";
import '../pages/Projects.css';
import { LRButton } from '../components/LRStyles'
import dbtopics from "../utils/topics.json";
import dblanguages from "../utils/languages.json";

const Card = styled(IonCard)`
  cursor: pointer;
  border-radius: 2rem;
  background-color: #EEF1FA;
  box-shadow: none;
  
  &:hover {
    background-color: #dfe5f5;
  }
`;

const CardHeader = styled(IonCardHeader)`
  display: flex;
  align-items: center;
`;

const Icon = styled(IonIcon)`
  font-size: 2.5rem;
  margin-right: 0.5rem;
`;

const Username = styled(IonCardSubtitle)`
  margin: 0;
  color: black;
`;

const Title = styled(IonCardTitle)`
  font-size: 1.2rem;
  font-weight: bold;
  padding-bottom: 1rem;
  color: black;
`;

const Date = styled(IonCardSubtitle)`
  margin: 0;
  text-align: right;
  font-size: 0.8rem;
  font-style: italic;
  color: black;
`;

const Description = styled.p`
  margin: 20px;
  margin-top: 5px;
  text-align: center;
  color: black;
`

const ProjTitle = styled.h2`
  margin-top: 50px;
  color: black;
`

const Owner = styled.p`
  margin: 0px;
  padding: 0px;
  font-size: 0.75em;
  color: black;
`

const TagText = styled.div`
  margin: 16px 0px;
  padding: 0px;
  font-size: 1em;
  color: black;
`
const TagTitle = styled.p`
  font-weight: bold;
`

const TitleInput = styled(IonInput)`
  margin: 50px;
  margin-top:35px;
  text-align: center;
  font-size: 24px;
  border-style: none;
  line-height: 1.2;
  padding: 15px;
  border-radius: 2rem;
  background: #dfe5f5;
`

const DescriptionInput = styled.textarea`
  margin: 20px;
  border-style: none;  
  border-radius: 2rem;
  background: #dfe5f5;
  resize: none;
  height: 60%;
  width: 80%;
  padding: 15px;
  border: none;
  outline: none;
`

const TagsWrapper = styled.div`
  margin: 0px 40px;
`

function EditableProjectCard(props) {
  const { title, description, date, url, owner, id, editFunc } = props;

  const [editMode, setEditMode] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [eTitle, setTitle] = useState(title);
  const [eDescription, setDescription] = useState(description);
  const [eUrl, setUrl] = useState(url);
  const [eTopics, setTopics] = useState(["Machine Learning"]);
  const [eLanguages, setLanguages] = useState(["Python", "JavaScript"]);


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

    if (limit) {
      showTags = tagType.slice(0, 3);
      hiddenTagCount = (tagType.length - 3)
    }
    return (
      <TagText>
        <strong>{title}: </strong>
        {showTags.map((item) => (
          <IonChip>{item}</IonChip>
        ))}
        {(limit & (hiddenTagCount > 0)) ? ("+ " + parseInt(hiddenTagCount) + " more") : ""}
      </TagText>
    )
  }

  return (
    <IonCol size="12" size-md="4" key={id}>
      {!editMode &&
        <IonModal id="projmod" isOpen={showProject}>

          <ProjTitle >{title}</ProjTitle>
          <Owner>Created By: {owner}</Owner>
          <Date>{date}</Date>
          <Description >{description}</Description>
          <TagsWrapper>
            <ProjectTags title="Languages" tagType={eLanguages} />
            <ProjectTags title="Tags" tagType={eTopics} />

          </TagsWrapper>
          <LRButton onClick={() => {
            const fullURL = eUrl.match(/^https?:/) ? eUrl : '//' + eUrl
            window.open(fullURL)
          }}>
            More Information
          </LRButton>

          <IonButton id="closemodal" onClick={() => setEditMode(true)}>Edit</IonButton>
          <IonButton style={{ marginBottom: "50px" }} id="closemodal" onClick={() => setShowProject(false)}>Close</IonButton>
        </IonModal>}

      {editMode &&
        <IonModal id="projmod" isOpen={showProject}>
          <IonItem>
            <TitleInput
              value={eTitle}
              onIonChange={(e) => {
                setTitle(e.target.value)
              }}
              type="text"
            ></TitleInput>
          </IonItem>

          <DescriptionInput id="desarea"
            value={eDescription}
            onChange={(e) => {
              setDescription(e.target.value)
            }}>
          </DescriptionInput >

          <textarea id="url"
            value={eUrl}
            onChange={(e) => setUrl(e.target.value)}
          ></textarea>

          <TagTitle>Languages</TagTitle>
          <IonSelect style={{ height: "100px", width: "500px" }} value={eLanguages} multiple={true} cancelText="Close" okText="Done"
            onIonChange={e => (setLanguages(e.target.value))}>
            {
              dblanguages.map(topic =>
                <IonSelectOption value={topic}>{topic}</IonSelectOption>
              )
            }
          </IonSelect>
          <TagTitle>Tags</TagTitle>
          <IonSelect style={{ height: "100px", width: "500px" }} value={eTopics} multiple={true} cancelText="Close" okText="Done"
            onIonChange={e => (setTopics(e.target.value))}>
            {
              dbtopics.map(topic =>
                <IonSelectOption value={topic}>{topic}</IonSelectOption>
              )
            }
          </IonSelect>

          <IonButton id="closemodal" onClick={saveChanges}>Save</IonButton>
          <IonButton id="closemodal" style={{ background: "red" }} onClick={handleDelete}>Delete</IonButton>
          <IonButton style={{ marginBottom: "50px" }} id="closemodal" onClick={closeEdit}>Close</IonButton>
        </IonModal>
      }

      <Card onClick={() => setShowProject(true)}>
        <CardHeader>
          <Icon icon={personCircleOutline} />
          <Username>{owner}</Username>
        </CardHeader>
        <IonCardContent>
          <Title>{title}</Title>
          <p>{description}</p>
          <Date>{date}</Date>
          <ProjectTags title="Languages" tagType={eLanguages} limit={true} />
          <ProjectTags title="Tags" tagType={eTopics} limit={true} />

        </IonCardContent>
      </Card>

    </IonCol >

  );
}

export default EditableProjectCard;
