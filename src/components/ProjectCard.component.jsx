import React, { useState, useContext, useEffect } from "react";
import {
  IonCardContent,
  IonCol,
  IonModal,
  IonButton,
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
  TitleInput,
  DescriptionInput,
  ModalContent,
  ModalContentView,
  ButtonsWrapper
} from './ProjectCardStyles';
import ProjectTags from './ProjectTags';
import { personCircleOutline, send, close, open } from "ionicons/icons";
import { useJwt } from "react-jwt";
import GlobalContext from "../utils/state/GlobalContext";
import { LRButton } from '../components/LRStyles'


function CategoryCard(props) {

  const { title, description, date, url, owner, id, languages, topics, collabs, showContactButton } = props;
  const [showProject, setShowProject] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [mTitle, setMTitle] = useState("");
  const [mMessage, setMMessage] = useState("");

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
      Promise.all([
        fetch(`/api/getUserData?username=${owner}`),
        fetch(`/api/getUserData?username=${decodedToken.username}`),
      ]).then(responses =>
        Promise.all(responses.map(response => response.json()))
      ).then(data => {

        console.log(data)
        let opts = {
          'title': mTitle,
          'message': mMessage + "<p>To contact " + decodedToken.username + ", please email at: " + data[1]?.userData.email + "</p>",
          // email of receiver, username of sender
          'sender': decodedToken.username,
          'receiver': data[0]?.userData.email
        }
        console.log(opts)
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
        <IonModal id="projmod" isOpen={showProject}>
          <ModalContent>
            <ModalContentView>
              <ProjTitle >{title}</ProjTitle>
              <Owner>Created By: {owner}</Owner>
              <Date>{date}</Date>
              <Description >{description}</Description>
              <LRButton onClick={() => {
                const fullURL = url.match(/^https?:/) ? url : '//' + url
                window.open(fullURL)
              }}>
                <SmallIcon slot="start" icon={open} />
                Github
              </LRButton>

              <ButtonsWrapper>
                {showContactButton &&
                  <IonButton id="closemodal" color="tertiary" onClick={() => {
                    if (decodedToken?.username) {
                      setShowContact(true)
                    }
                    else {
                      return present({
                        header: "Please log in or register first!",
                        buttons: [
                          {
                            text: 'Ok', handler: (d) => {
                              window.location.href = ("/Login")
                            }
                          }

                        ],
                      })
                    }
                  }}

                  >
                    <SmallIcon slot="start" icon={send} />
                    Contact
                  </IonButton>
                }
                <IonButton style={{ marginBottom: "50px" }} id="closemodal" onClick={() => setShowProject(false)}>
                  <SmallIcon slot="start" icon={close} />
                  Close
                </IonButton>
              </ButtonsWrapper>

            </ModalContentView>
          </ModalContent>
        </IonModal>
      }
      {showContact &&
        <IonModal id="projmod" isOpen={showProject}>
          <ModalContent>

            <TitleInput
              value={mTitle}
              placeholder="Subject"
              onIonChange={(e) => setMTitle(e.target.value)}
            ></TitleInput>
            <DescriptionInput
              value={mMessage}
              placeholder="Message"
              onIonChange={(e) => setMMessage(e.target.value)}
            ></DescriptionInput>
            <ButtonsWrapper>

              <IonButton id="closemodal" color="secondary" onClick={sendEmail}>
                <SmallIcon slot="start" icon={send} />
                Send
              </IonButton>
              <IonButton
                id="closemodal"
                onClick={() => setShowContact(false)}
              >
                <SmallIcon slot="start" icon={close} />
                Close
              </IonButton>
            </ButtonsWrapper>

          </ModalContent>
        </IonModal>
      }

      <Card onClick={() => setShowProject(true)}>
        <CardHeader>
          <Icon icon={personCircleOutline} />
          <Username>{owner}</Username>
        </CardHeader>
        <IonCardContent>
          <Title>{title}</Title>
          <Description>{description.length < 100 ? description : description.slice(0, 100) + "..."}</Description>
          <Date style={{ textAlign: "right" }}>{date}</Date>

          <ProjectTags title="Languages" tagType={languages} limit={true} />
          <ProjectTags title="Tags" tagType={topics} limit={true} />
          <ProjectTags title="Collaborators" tagType={collabs} limit={true} />

        </IonCardContent>
      </Card>
    </IonCol>
  );
}

export default CategoryCard;
