import React, { useState,useContext } from "react";
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
  IonInput,
  IonItem,
  useIonAlert
} from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import styled from "styled-components";
import { useJwt } from "react-jwt";
import GlobalContext from "../utils/state/GlobalContext";
import { LRTitle, LRWrapper, LRSmall, LRSwitch, LRLink, LRCol, LRButton } from '../components/LRStyles'


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
  color: black;
`;
const Title = styled(IonCardTitle)`
  font-size: 1.2rem;
  font-weight: bold;
  padding-bottom: 1rem;
  color: black;
`;
const Date = styled(IonCardSubtitle)`
  margin: 0;
  text-align: right;
  font-size: 0.8rem;
  font-style: italic;
  color: black;
`;
const Tags = styled.p`
  padding-top: 1rem;
  color: #B4B5B8;
`;

const Description = styled.p`
  margin: 20px;
  margin-top: 5px;
  text-align: center;
  color: black;
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
const TitleInput = styled(IonInput)`
  margin: 50px;
  margin-top:35px;
  text-align: center;
  font-size: 24px;
  border-style: none;
  line-height: 1.2;
  padding: 15px;
  border-radius: 2rem;
  background: #dfe5f5;
`

const DescriptionInput = styled.textarea`
  margin: 20px;
  border-style: none;  
  border-radius: 2rem;
  background: #dfe5f5;
  resize: none;
  height: 60%;
  width: 80%;
  padding: 15px;
  border: none;
  outline: none
`
function CategoryCard(props) {

  const { title, description, date, url, owner, id, customClick } = props;
  const [showProject, setShowProject] = useState(false);
  const [showContact,setShowContact]=useState(false);
  const [mTitle, setMTitle] = useState("");
  const [mMessage, setMMessage] = useState("");

  const {state} = useContext(GlobalContext);
  const {decodedToken} = useJwt(state.token);
  const [present] = useIonAlert()

  function sendEmail() {

    
    if(!mTitle || !mMessage){
      return present({
        header: "Please fill out all the fields!",
        buttons: [
          'Ok'
        ]
      })
    } else{
    fetch(`/api/getUserData?username=${owner}`).then(res => res.json()).then(data => {
      let opts = {
        'title':mTitle,
        'message':mMessage,
        // email of receiver, username of sender
        'sender':decodedToken.username,
        'receiver':data.userData.email
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
          
          
      }).then(()=>{return present({
        header: "Message sent!",
        buttons: [
          {text:'Ok', handler:(d)=>{
            setShowContact(false)
            setMTitle("")
            setMMessage("")
          }}
        ]
      })})
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

        <IonButton id="closemodal" onClick={()=>setShowContact(true)}>Contact</IonButton>
        <IonButton style={{ marginBottom: "50px" }} id="closemodal" onClick={() => setShowProject(false)}>Close</IonButton>
       </IonModal>
       }
      {showContact &&
         <IonModal id="projmod" isOpen={showProject} cssClass='my-custom-class' >
          <IonItem>
            <textarea id="mTitle"
                placeholder="Title"
                value={mTitle}
                onChange={(e)=>setMTitle(e.target.value)}
            ></textarea>
          </IonItem>
          <textarea id="desarea"
              placeholder="Message"
              value={mMessage}
              onChange={(e)=>setMMessage(e.target.value)}
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
