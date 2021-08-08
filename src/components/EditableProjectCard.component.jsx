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

function CategoryCard(props) {
  const [editMode, setEditMode] = useState(false);
  const { title, description, date, url, owner, id, customClick } = props;
  const [showProject, setShowProject] = useState(false);
  const [eTitle, setTitle] = useState(title);
  const [eDescription, setDescription] = useState(description);
  const [eUrl, setUrl] = useState(url);

  function saveChanges() {
    setEditMode(false)
    // send changes to backend

  }

  return (
    <IonCol size="12" size-md="4" key={id}>
      {!editMode &&
        <IonModal id="projmod" isOpen={showProject} cssClass='my-custom-class'>
          <h2 style={{
            marginTop: "50px"
          }}>{title}</h2>

          <p style={{
            margin: "0px",
            padding: "0px",
            fontSize: "0.75em"
          }}>Created By: {owner}</p>

          <p style={{
            fontSize: "0.75em"
          }}>{date}</p>

          <Description >   {description}</Description>

          <Description >   {description}</Description>

          <IonButton id="closemodal" onClick={() => setEditMode(true)}>Edit</IonButton>

          <IonButton style={{ marginBottom: "50px" }} id="closemodal" onClick={() => setShowProject(false)}>Close</IonButton>
        </IonModal>}

      {editMode &&
        <IonModal id="projmod" isOpen={showProject} cssClass='my-custom-class' style={{
          display: "flex",
          justifyContet: "center",
          alignItems: "center"
        }}>
          <IonItem>
            <IonInput
              style={{
                margin: "50px",
                textAlign: "center",
                fontSize: "24px",
                borderStyle: "none",
                lineHeight: "1.2",
                padding: "15px",

                borderRadius: "2rem",
                background: "#dfe5f5"
              }}
              value={eTitle}
              onIonChange={(e) => {
                setTitle(e.target.value)

              }}
              type="text"
            ></IonInput>
          </IonItem>
          <textarea id="desarea"
            style={{

              margin: "20px",
              borderStyle: "none",
              borderRadius: "2rem",
              background: "#dfe5f5",
              resize: "none",
              height: "60%",
              width: "80%",
              padding: "15px",
              border: "none",
              outline: "none"


            }}
            value={eDescription}
            onChange={(e) => {
              setDescription(e.target.value)
            }}


          ></textarea>



          <IonButton id="closemodal" onClick={saveChanges}>Save</IonButton>

          <IonButton style={{ marginBottom: "50px" }} id="closemodal" onClick={() => setShowProject(false)}>Close</IonButton>
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
