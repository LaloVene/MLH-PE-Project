import React from "react";
import styled from "styled-components";
import {
  IonIcon
} from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";

const Container = styled.div`
`;
const Icon = styled(IonIcon)`
`;
const Title = styled.h1`
  font-size: 1.5rem;
`;      
const Message = styled.p`
  font-size: 1.5rem;
`;      

function Searchbar(props) {
  const { message } = props;
  return (
    <Container>
      <Icon icon={personCircleOutline} />
      <Title>{ 'Not Found' }</Title>
      <Message>{ message || 'We weren´t able to find this content.' }</Message>
    </Container>
  );
}

export default Searchbar;
