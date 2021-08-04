import { UseIonAlertResult, IonButton, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import React, { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Register: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [github, setGithub] = useState('')
  const [present] = useIonAlert()

  const onSubmitClick = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    console.log("You pressed register")
    var msg = ""
    let opts = {
      'name': name,
      'username': username,
      'password': password,
      'github': github,
      'email': email
    }
    console.log(opts)
    const finalresp = await fetch('/api/register', {
      method: 'post',
      body: JSON.stringify(opts)
    }).then(r => r.json())
      .then(resp => {
        console.log(resp)
        if (resp.status == "ok") {
          window.open("/tab2")
          msg = resp.message
          console.log("Correct,take to login")

        }
        else {
          msg = resp.message

        }
      })
    return present({
      cssClass: 'my-css',
      header: msg,
      message: "",
      buttons: [
        'Ok',
      ],
      onDidDismiss: (e) => console.log('clicked ok'),
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Register</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Register" />
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating"> Name</IonLabel>
              <IonInput
                type="text"
                value={name}
                onIonChange={(e: { detail: { value: any; }; }) => setName(e.detail.value!)}
              >
              </IonInput>

              <IonLabel position="floating"> Username</IonLabel>
              <IonInput
                type="text"
                value={username}
                onIonChange={(e: { detail: { value: any; }; }) => setUsername(e.detail.value!)}
              >
              </IonInput>

              <IonLabel position="floating"> Email</IonLabel>
              <IonInput
                type="email"
                value={email}
                onIonChange={(e: { detail: { value: any; }; }) => setEmail(e.detail.value!)}
              >
              </IonInput>

              <IonLabel position="floating"> Password</IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e: { detail: { value: any; }; }) => setPassword(e.detail.value!)}
              >
              </IonInput>

              <IonLabel position="floating"> Github</IonLabel>
              <IonInput
                type="url"
                value={github}
                onIonChange={(e: { detail: { value: any; }; }) => setGithub(e.detail.value!)}
              >
              </IonInput>



              <IonButton expand="block" onClick={onSubmitClick}>
                Register
              </IonButton>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Register;
