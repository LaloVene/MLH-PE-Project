import React, { useState } from "react";
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
  IonTextarea,
  IonItem
} from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import styled from "styled-components";
import { URLSearchParams } from "url";
import '../pages/Projects.css';
import LRButton from '../components/LoginRegisterButton.component';

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
`;
const Title = styled(IonCardTitle)`
  font-size: 1.2rem;
  font-weight: bold;
  padding-bottom: 1rem;
`;
const Date = styled(IonCardSubtitle)`
  margin: 0;
  text-align: right;
  font-size: 0.8rem;
  font-style: italic;
`;
const Tags = styled.p`
  padding-top: 1rem;
  color: #B4B5B8;
`;

const Description = styled.p`
  margin: 20px;
  margin-top: 5px;
  text-align: center;
`

const ProjTitle = styled.h2`

  margin-top: 50px;

`

const Owner = styled.p`

  margin: 0px;
  padding: 0px;
  font-size: 0.75em;

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
  outline: none
`


function CategoryCard(props) {
  const { title, description, date, url, owner, id, customClick } = props;

  const [editMode, setEditMode] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [eTitle, setTitle] = useState(title);
  const [eDescription, setDescription] = useState(description);
  const [eUrl, setUrl] = useState(url);

  function closeEdit() {
    setShowProject(false)
    setEditMode(false)
    // don't save changes
    setTitle(title)
    setDescription(description)
    setUrl(url)

  }


  function saveChanges() {
    setShowProject(false)
    setEditMode(false)

    let opts = {
      "id": id,
      "title": eTitle,
      "description": eDescription,
      "url": eUrl

    }

    fetch('/api/editProject', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(opts)
    }).then(r => r.json())
      .then(resp => {
        console.log(resp)
        if (resp.status == "ok") {
          console.log("Successfully edited")
        }
        else {
          console.log(resp.error)
        }
      })
  }

  return (
    <IonCol size="12" size-md="4" key={id}>
      {!editMode &&
        <IonModal id="projmod" isOpen={showProject} cssClass='my-custom-class'>

          <ProjTitle >{title}</ProjTitle>
          <Owner>Created By: {owner}</Owner>
          <Date>{date}</Date>
          <Description >{description}</Description>
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
        <IonModal id="projmod" isOpen={showProject} cssClass='my-custom-class' >
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

          <IonButton id="closemodal" onClick={saveChanges}>Save</IonButton>
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
          <Tags>{'Tags: Python, ML/AI, Web Dev'}</Tags>
        </IonCardContent>
      </Card>

    </IonCol >

  );
}

export default CategoryCard;
