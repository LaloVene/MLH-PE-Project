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
  IonButton
} from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import styled from "styled-components";

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

  const { title, description, date, url, owner, id, customClick } = props;
  const [showProject, setShowProject] = useState(false);
  // const [languages, setLanguages] = useState([]);
  // const [topics, setTopics] = useState([])

  // useEffect(() => {
  //   fetch("http://lalovene.duckdns.org:5000/api/getProjectTopics", {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ "projectId": id })
  //   }).then(r => setTopics(r.json().topics))
  // }, [setTopics]);

  // useEffect(() => {
  //   fetch("http://lalovene.duckdns.org:5000/api/getProjectLanguages", {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ "projectId": id })
  //   }).then(r => setLanguages(r.json().languages))
  // }, [setLanguages]);


  return (
    <IonCol size="12" size-md="4" key={id}>
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

        <IonButton id="closemodal">Contact</IonButton>

        <IonButton style={{ marginBottom: "50px" }} id="closemodal" onClick={() => setShowProject(false)}>Close</IonButton>
      </IonModal>

      <Card onClick={() => setShowProject(true)}>
        <CardHeader>
          <Icon icon={personCircleOutline} />
          <Username>{owner}</Username>
        </CardHeader>
        <IonCardContent>
          <Title>{title}</Title>
          <p>{description}</p>
          <Date>{date}</Date>
          {/* <Tags>Languages: {languages}</Tags>
          <Tags>Topics: {topics}</Tags> */}
          <Tags>{'Tags: Python, ML/AI, Web Dev'}</Tags>
        </IonCardContent>
      </Card>

    </IonCol>

  );
}

export default CategoryCard;
