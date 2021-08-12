import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonIcon,
    IonInput,
    IonContent,
} from "@ionic/react";
import styled from "styled-components";

const Card = styled(IonCard)`
  cursor: pointer;
  border-radius: 2rem;
  padding: 10px;
  background-color: #D4E0FF;
  box-shadow: none;  
  &:hover {
    background-color: #c2d0f3;
  }
`;

const CardHeader = styled(IonCardHeader)`
  display: flex;
  align-items: center;
`;

const Icon = styled(IonIcon)`
  font-size: 3rem;
  margin-right: 1rem;
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
  font-size: 0.8rem;
  font-style: italic;
  color: black;
  margin-right: 10px;
`;

const Description = styled.p`
  color: black;
  margin-bottom: 24px;
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
  margin-top: 40px;
  text-align: center;
  font-size: 22px;
  line-height: 40px;
  border-style: none;
  padding: 24px;
  background: #d8e3ff;
  border-radius: 1rem;
  width: 80%;
  margin-left: 55px;
`

const DescriptionInput = styled.textarea`
  margin-top: 24px;
  border-style: none;  
  border-radius: 1rem;
  font-size: 14px;
  background: #d8e3ff;
  height: 40%;
  width: 80%;
  padding: 24px;
  border: none;
  outline: none;
`
const LinkInput = styled(DescriptionInput)`
  height: 15%;
  resize: none;
`

const TagsWrapper = styled.div`
  margin: 0px 40px;
`

const ModalContent = styled(IonContent)`
  width: 585px;
  align-items: center;
  text-align: center;
`

const ModalContentView = styled.div`
padding: 24px;
`

const ButtonsWrapper = styled.div`
  margin-top: 24px;
`

export {
    Card,
    CardHeader,
    Icon,
    Username,
    Title,
    Date,
    Description,
    ProjTitle,
    Owner,
    TagText,
    TagTitle,
    TitleInput,
    DescriptionInput,
    LinkInput,
    TagsWrapper,
    ModalContent,
    ModalContentView,
    ButtonsWrapper
};