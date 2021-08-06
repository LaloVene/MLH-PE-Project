import React from "react";
import {
    IonCard,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    IonModal
} from "@ionic/react";
import { cubeOutline } from "ionicons/icons";
import styled from "styled-components";

const Modal = styled.IonModal`
  
  border-radius: 5rem;
  
`;

function ProjModal(props) {

    const { name } = props;

    return (

        <Modal isOpen={showProject}>
            <p>This is modal content</p>
            <IonButton onClick={() => setShowProject(false)}>Close Modal</IonButton>
        </Modal>
    );
}

export default ProjModal;