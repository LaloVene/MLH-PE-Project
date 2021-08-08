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
  IonInput
} from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import styled from "styled-components";
import { URLSearchParams } from "url";

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

          <p style={{
            margin: "20px",
            marginTop: "5px",
            textAlign: "center"
          }}>   {description}</p>

          <p style={{
            margin: "20px",
            marginTop: "5px",
            textAlign: "center"
          }}>   {description}</p>

          <IonButton id="closemodal" onClick={() => setEditMode(true)}>Edit</IonButton>

          <IonButton style={{ marginBottom: "50px" }} id="closemodal" onClick={() => setShowProject(false)}>Close</IonButton>
        </IonModal>}

      {editMode &&
        <IonModal id="projmod" isOpen={showProject} cssClass='my-custom-class'>
          <IonInput
            style={{
              marginTop: "50px",
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "500",
              lineHeight: "1.2",
              borderStyle: "solid",
              border: "1px solid black",
              background: "gray"
            }}
            value={eTitle}
            onIonChange={(e) => setTitle(e.target.value)}
            type="text"
          ></IonInput>

          <p style={{
            margin: "0px",
            padding: "0px",
            fontSize: "0.75em"
          }}>
            Created By: {owner}
          </p>

          <p style={{
            fontSize: "0.75em"
          }}>{date}</p>

          <IonInput
            style={{
              margin: "20px",
              marginTop: "5px",
              textAlign: "center",
              borderStyle: "solid",
              border: "1px solid black",
              background: "gray"
            }}
            value={eDescription}
            onIonChange={(e) => setDescription(e.target.value)}
            type="text"
          ></IonInput>



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

    </IonCol>

  );
}

export default CategoryCard;
