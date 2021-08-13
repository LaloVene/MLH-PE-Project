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
  height: 11rem;
  background-color: #ffe1be;
  box-shadow: none;
  max-width: 20vw;
  
  &:hover {
    border: 4px solid hsl(32.14285714285714, 59.15492957746478%, 72.15686274509804%);
  }
`;

const Icon = styled(IonIcon)`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Title = styled(IonCardTitle)`
  font-size: 1.1rem;
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
