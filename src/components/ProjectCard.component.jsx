import React, { useState, useContext } from "react";
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
  IonItem,
  useIonAlert
} from "@ionic/react";
import {
  Card,
  CardHeader,
  Icon,
  SmallIcon,
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
} from './ProjectCardStyles';
import ProjectTags from './ProjectTags';
import { personCircleOutline } from "ionicons/icons";
import styled from "styled-components";
import { useJwt } from "react-jwt";
import GlobalContext from "../utils/state/GlobalContext";
import { LRButton } from '../components/LRStyles'

const Tags = styled.p`
  padding-top: 1rem;
  color: #B4B5B8;
`;

function CategoryCard(props) {

  const { title, description, date, url, owner, id } = props;
  const [showProject, setShowProject] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [mTitle, setMTitle] = useState("");
  const [mMessage, setMMessage] = useState("");

  const languages = ["Python", "JavaScript"]
  const topics = ["ML", "CV"]

  const { state } = useContext(GlobalContext);
  const { decodedToken } = useJwt(state.token);
  const [present] = useIonAlert()

  function sendEmail() {


    if (!mTitle || !mMessage) {
      return present({
        header: "Please fill out all the fields!",
        buttons: [
          'Ok'
        ]
      })
    } else {
      fetch(`/api/getUserData?username=${owner}`).then(res => res.json()).then(data => {
        let opts = {
          'title': mTitle,
          'message': mMessage,
          // email of receiver, username of sender
          'sender': decodedToken.username,
          'receiver': data.userData.email
        }
        return fetch('/api/sendmessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(opts)
        })
      })

        .then(r => r.json())
        .then(resp => {
          console.log(resp)


        }).then(() => {
          return present({
            header: "Message sent!",
            buttons: [
              {
                text: 'Ok', handler: (d) => {
                  setShowContact(false)
                  setMTitle("")
                  setMMessage("")
                }
              }
            ]
          })
        })
    }
  }

  return (

    <IonCol size="12" size-md="4" key={id}>
      {!showContact &&
        <IonModal id="projmod" isOpen={showProject} cssClass='my-custom-class'>

          <ProjTitle >{title}</ProjTitle>
          <Owner>Created By: {owner}</Owner>
          <Date>{date}</Date>
          <Description >{description}</Description>
          <LRButton onClick={() => {
            const fullURL = url.match(/^https?:/) ? url : '//' + url
            window.open(fullURL)
          }}>
            More Information
          </LRButton>

          <IonButton id="closemodal" onClick={() => setShowContact(true)}>Contact</IonButton>
          <IonButton style={{ marginBottom: "50px" }} id="closemodal" onClick={() => setShowProject(false)}>Close</IonButton>
        </IonModal>
      }
      {showContact &&
        <IonModal id="projmod" isOpen={showProject} cssClass='my-custom-class' >
          <IonItem>
            <textarea id="mTitle"
              placeholder="Title"
              value={mTitle}
              onChange={(e) => setMTitle(e.target.value)}
            ></textarea>
          </IonItem>
          <textarea id="desarea"
            placeholder="Message"
            value={mMessage}
            onChange={(e) => setMMessage(e.target.value)}
          ></textarea>

          <IonButton id="closemodal" onClick={sendEmail}>Send</IonButton>
          <IonButton style={{ marginBottom: "50px" }} id="closemodal" onClick={() => setShowContact(false)}>Close</IonButton>
        </IonModal>
      }


      <Card onClick={() => setShowProject(true)}>
        <CardHeader>
          <Icon icon={personCircleOutline} />
          <Username>{owner}</Username>
        </CardHeader>
        <IonCardContent>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <Date style={{ textAlign: "right" }}>{date}</Date>

          <ProjectTags title="Languages" tagType={languages} limit={true} />
          <ProjectTags title="Tags" tagType={topics} limit={true} />

        </IonCardContent>
      </Card>

    </IonCol>

  );
}

export default CategoryCard;
