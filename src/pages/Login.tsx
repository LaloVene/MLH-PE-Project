import { useIonAlert, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useContext } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import LRButton from '../components/LoginRegisterButton.component';
import GlobalContext from "../utils/state/GlobalContext";
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const LoginTitle = styled.h3`
    margin-bottom: 24px;
    margin-top: 36px;
`;

const LoginWrapper = styled.div`
    margin-bottom: 12px;
`;

const LoginSmall = styled.small`
  margin-left: 10px;
`;

const LoginNew = styled.p`
  border-top: black;
`;

const LoginLink = styled(Link)`
  text-decoration: none;
`

const LoginCol = styled(IonCol)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 25px;
`;

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

    const finalresp = await fetch('/api/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(opts)
    }).then(r => r.json())
      .then(resp => {
        console.log(resp)
        if (resp.status == "ok") {
          dispatch({ type: "ADD_TOKEN", token: resp.token });
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
          <LoginCol>
            <LoginTitle>
              Login to DevUp
            </LoginTitle>

            <LoginWrapper>

              <IonItem>
                <IonLabel position="floating"> Username</IonLabel>
                <IonInput
                  type="text"
                  value={username}
                  onIonChange={(e: { detail: { value: any; }; }) => setUsername(e.detail.value!)}
                />
              </IonItem>

              <IonItem>
                <IonLabel position="floating"> Password</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e: { detail: { value: any; }; }) => setPassword(e.detail.value!)}
                />
              </IonItem>

              <LoginSmall>
                <LoginLink to="#">Forgot password?</LoginLink>
              </LoginSmall>

            </LoginWrapper>

            <LRButton onClick={onSubmitClick}>
              Login
            </LRButton>

            <LoginNew>
              New to DevUp? <LoginLink to="/register">Create an account</LoginLink>
            </LoginNew>
            
          </LoginCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Login;
