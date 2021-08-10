import { IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import Header from '../components/Header.component';
import dbtopics from "../utils/topics.json";
import { LRTitle, LRWrapper, LRSwitch, LRLink, LRCol, LRButton } from '../components/LRStyles' 

const Register: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [github, setGithub] = useState('')
  const [languages, setLanguages] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);

  const [present] = useIonAlert()

  const onSubmitClick = (e: { preventDefault: () => void; }) => {
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

    fetch('/api/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(opts)
    }).then(r => r.json())
      .then(resp => {

        if (resp.status == "ok") {
          msg = "Success!"
          setTimeout(() => window.location.href = ("login"), 3000)
        }
        else if (resp.status == "1") {
          msg = "Missing Fields"
        }
        else {
          console.log(resp)
          msg = resp.error
        }
      })

    return present({
      cssClass: 'my-css',
      header: msg,
      message: "",
      buttons: [
        'Ok',
      ],
      onDidDismiss: () => {
        if (msg == "Success!") {
          window.location.href = ("/login")
        }
      },
    })
  }

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <ExploreContainer name="Register" />
        <IonRow style={{
          margin: "25px"
        }}>
          <LRCol>

          <LRTitle>
              Register for DevUp
          </LRTitle>

          <LRWrapper>

            <IonItem>
              <IonInput
                type="text"
                value={name}
                placeholder="Name"
                required
                onIonChange={(e: { detail: { value: any; }; }) => setName(e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonInput
                type="text"
                placeholder="Username"
                required
                value={username}
                onIonChange={(e: { detail: { value: any; }; }) => setUsername(e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonInput
                type="email"
                value={email}
                placeholder="Email"
                required
                onIonChange={(e: { detail: { value: any; }; }) => setEmail(e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonInput
                type="password"
                value={password}
                placeholder="Password"
                required
                onIonChange={(e: { detail: { value: any; }; }) => setPassword(e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonInput
                type="url"
                placeholder="Github"
                required
                value={github}
                onIonChange={(e: { detail: { value: any; }; }) => setGithub(e.detail.value!)}
              />
            </IonItem>

            <IonRow>
              <IonItem>
                <IonLabel>Languages</IonLabel>
                <IonSelect value={languages} multiple={true} cancelText="Close" okText="Done" onIonChange={e => setLanguages(e.detail.value)} style={{ width: "200px" }}>
                  {
                    dblanguages.map(lang =>
                      <IonSelectOption value={lang}>{lang}</IonSelectOption>
                    )
                  }
                </IonSelect>
              </IonItem>
            </IonRow>

            <IonRow>
              <IonItem>
                <IonLabel>Interests</IonLabel>
                <IonSelect value={topics} multiple={true} cancelText="Close" okText="Done" onIonChange={e => setTopics(e.detail.value)} style={{ width: "200px" }}>
                  {
                    dbtopics.map(topic =>
                      <IonSelectOption value={topic}>{topic}</IonSelectOption>
                    )
                  }
                </IonSelect>
              </IonItem>
            </IonRow>

            </LRWrapper>

            <LRButton onClick={onSubmitClick} >
              Register
            </LRButton>
            <LRSwitch>
              Already have an account? <LRLink to="/login">Login</LRLink>
            </LRSwitch>

          </LRCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Register;
