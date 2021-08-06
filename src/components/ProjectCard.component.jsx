import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonIcon
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

  const { title, description, date, url, owner, customClick } = props;

  return (
    <Card onClick={customClick}>
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
  );
}

export default CategoryCard;
