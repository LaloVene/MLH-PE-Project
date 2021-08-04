import { IonButton, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';





const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const onRegisterClick =()=>{
    window.open("/tab3","_blank")

  }
  const onSubmitClick = (e: { preventDefault: () => void; })=>{
    e.preventDefault()
    console.log("You pressed login")
    let opts = {
      'username': username,
      'password': password
    }
    console.log(opts)
    fetch('/api/login', {
      method: 'post',
      body: JSON.stringify(opts)
    }).then(r => r.json())
      .then(resp => {
        if (resp.status=="ok"){
          window.open("/tab4")
          console.log("Successfully logged in")          
        }
        else if (resp[1]==418) {
          console.log(resp.error)
        }
        else {
          console.log(resp.message)
        }
      })
    

  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Login" />
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating"> Username</IonLabel>
              <IonInput
                type="text"
                value={username}
                onIonChange={(e: { detail: { value: any; }; }) => setUsername(e.detail.value!)}
                >

              
              </IonInput>
              <IonLabel position="floating"> Password</IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e: { detail: { value: any; }; }) => setPassword(e.detail.value!)}
                >
              </IonInput>
              <IonButton expand="block" onClick={onSubmitClick}>
                Login
              </IonButton>
              <IonButton expand="block" onClick={onRegisterClick}>
                Register
               
              </IonButton>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Login;
