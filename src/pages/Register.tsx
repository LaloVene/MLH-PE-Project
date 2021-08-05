import { UseIonAlertResult, IonButton, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Register.css';

const Register: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [github, setGithub] = useState('')
  const [languages, setLanguages] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);

  const [present] = useIonAlert()

  const onSubmitClick = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    var msg = ""
    let opts = {
      'name': name,
      'username': username,
      'password': password,
      'github': github,
      'email': email,
    }


    languages.forEach(function (lang) {
      fetch('/api/addUserLanguage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'username': username,
          'language': lang
        })
      }).then(r => r.json())
        .then(resp => {

          if (resp.status == "ok") {
            console.log(resp.message)
          }
          else {
            console.log(resp.error)
          }
        })
    })

    topics.forEach(function (topic) {
      fetch('/api/addUserTopic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'username': username,
          'topic': topic
        })
      }).then(r => r.json())
        .then(resp => {

          console.log(topic)
          if (resp.status == "ok") {
            console.log(resp.message)
          }
          else {
            console.log(resp.error)
          }
        })
    })




    const finalresp = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'

      },
      body: JSON.stringify(opts)
    }).then(r => r.json())
      .then(resp => {

        if (resp.status == "ok") {

          window.location.href = ("/Login")

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
            </IonItem>

            <IonItem>
              <IonLabel position="floating"> Username</IonLabel>
              <IonInput
                type="text"
                value={username}
                onIonChange={(e: { detail: { value: any; }; }) => setUsername(e.detail.value!)}
              >
              </IonInput>
            </IonItem>


            <IonItem>
              <IonLabel position="floating"> Email</IonLabel>
              <IonInput
                type="email"
                value={email}
                onIonChange={(e: { detail: { value: any; }; }) => setEmail(e.detail.value!)}
              >
              </IonInput>

            </IonItem>

            <IonItem>
              <IonLabel position="floating"> Password</IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e: { detail: { value: any; }; }) => setPassword(e.detail.value!)}
              >
              </IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="floating"> Github</IonLabel>
              <IonInput
                type="url"
                value={github}
                onIonChange={(e: { detail: { value: any; }; }) => setGithub(e.detail.value!)}
              >
              </IonInput>
            </IonItem>

            <IonRow>
              <IonItem>
                <IonLabel>Languages</IonLabel>
                <IonSelect value={languages} multiple={true} cancelText="Close" okText="Done" onIonChange={e => setLanguages(e.detail.value)}>
                  <IonSelectOption value="Python">Python</IonSelectOption>
                  <IonSelectOption value="Java">Java</IonSelectOption>
                  <IonSelectOption value="Javascript">Javascript</IonSelectOption>
                  <IonSelectOption value="C">C</IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonItem>Languages: {languages.length ? languages.join(", ") : '(none selected)'}</IonItem>
            </IonRow>
            <IonRow>
              <IonItem>
                <IonLabel>Interests</IonLabel>
                <IonSelect value={topics} multiple={true} cancelText="Close" okText="Done" onIonChange={e => setTopics(e.detail.value)}>
                  <IonSelectOption value="Machine Learning">Machine Learning</IonSelectOption>
                  <IonSelectOption value="DevOps">DevOps</IonSelectOption>
                  <IonSelectOption value="Distributed Systems">Distributed Systems</IonSelectOption>
                  <IonSelectOption value="Artifical Intelligence">Artifical Intelligence</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem>Topics: {topics.length ? topics.join(", ") : '(none selected)'}</IonItem>
            </IonRow>

            <IonButton expand="block" onClick={onSubmitClick}>
              Register
            </IonButton>

          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Register;