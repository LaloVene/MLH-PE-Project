import React from "react";
import {
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonIcon
} from "@ionic/react";
import { cubeOutline } from "ionicons/icons";
import styled from "styled-components";

const Card = styled(IonCard)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-align: center;
  border-radius: 1rem;
  height: 10rem;
  /* width: 10rem; */
  background-color: #EEF1FA;
  /* box-shadow: 0 0.3px 2.2px rgba(0, 0, 0, 0.02),
  0 0.8px 5.3px rgba(0, 0, 0, 0.028), 0 1.5px 10px rgba(0, 0, 0, 0.035),
  0 2.7px 17.9px rgba(0, 0, 0, 0.042), 0 5px 33.4px rgba(0, 0, 0, 0.05),
  0 12px 80px rgba(0, 0, 0, 0.07); */
  box-shadow: none;
  
  &:hover {
    border: 1px solid hsl(0, 0%, 80%);
  }
`;
const Icon = styled(IonIcon)`
  font-size: 3rem;
`;
const Title = styled(IonCardTitle)`
  font-size: 1.2rem;
`;

function CategoryCard(props) {

  const { name } = props;

  return (
    <Card>
      <IonCardContent>
        <Icon icon={cubeOutline} />
        <Title>{name}</Title>
      </IonCardContent>
    </Card>
  );
}

export default CategoryCard;
