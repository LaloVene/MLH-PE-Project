import { useState, useContext } from "react";
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
import { personCircleOutline, send, close, open, mail } from "ionicons/icons";
import { useJwt } from "react-jwt";
import GlobalContext from "../utils/state/GlobalContext";
import { LRButton } from '../components/LRStyles'

function CategoryCard(props) {

  const { title, description, date, url, owner, id, languages, topics } = props;
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
      fetch(`/api/getUserData?username=${owner}`).then(res => res.json()).then(data => {
        let opts = {
          'title': mTitle,
          'message': mMessage,
          // email of receiver, username of sender
          'sender': decodedToken.username,
          'senderEmail': decodedToken.email,
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
        .then(() => {
          return present({
            header: "Message sent!",
            buttons: [
              {
                text: 'Ok', handler: () => {
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
                More Information
              </LRButton>

              <ButtonsWrapper>
                <IonButton id="closemodal" color="tertiary" onClick={() => setShowContact(true)}>
                  <SmallIcon slot="start" icon={mail} />
                  Contact
                </IonButton>
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
              maxlength={30}
            ></TitleInput>
            <DescriptionInput
              value={mMessage}
              placeholder="Message"
              onIonChange={(e) => setMMessage(e.target.value)}
              rows={5}
              maxlength={240}
            ></DescriptionInput>
            <ButtonsWrapper>

              <IonButton id="closemodal" color="secondary" onClick={sendEmail}>
                <SmallIcon slot="start" icon={send} />
                Send
              </IonButton>
              <IonButton
                style={{ marginBottom: "50px" }}
                id="closemodal"
                onClick={() => setShowContact(false)}
              >
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
