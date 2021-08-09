import { useIonAlert, IonButton, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useContext } from 'react';
import CategoryButton from '../components/CategoryButton.component';
import ExploreContainer from '../components/ExploreContainer';
import LRButton from '../components/LoginRegisterButton.component';
import GlobalContext from "../utils/state/GlobalContext";
import './Login.css';





const Login: React.FC = () => {
  const { dispatch } = useContext(GlobalContext);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [present] = useIonAlert();
  console.log(window.location.href)


  const onSubmitClick = async (e: { preventDefault: () => void; }) => {


    var msg = "";
    e.preventDefault()
    console.log("You pressed login")
    let opts = {
      'username': username,
      'password': password
    }
    console.log(opts)

    const finalresp = await fetch('http://lalovene.duckdns.org:5000/api/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(opts)
    }).then(r => r.json())
      .then(resp => {
        console.log(resp)
        if (resp.status == "ok") {
          dispatch({ type: "TOGGLE_THEME", token: resp.token });

          window.location.href = ("/Profile")

          msg = "Successfully logged in"

        }

        else {
          msg = resp.error

        }
      })

    return present({
      cssClass: 'my-css',
      header: msg,
      message: '',
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
        <IonRow style={{

          margin: "130px"

        }}>
          <IonCol style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            margin: "25px"

          }}>
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

              <IonLabel position="floating"> Password</IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e: { detail: { value: any; }; }) => setPassword(e.detail.value!)}
              >
              </IonInput>
            </IonItem>
            <IonItem>
              <LRButton onClick={onSubmitClick}>
                Login
              </LRButton>

            </IonItem>
            <IonItem>
              <LRButton onClick={() => window.location.href = '/Register'} >
                Create an Account

              </LRButton>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Login;
