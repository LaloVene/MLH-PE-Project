import { useIonAlert, IonInput, IonItem, IonLabel, IonRow } from '@ionic/react';
import React, { useState, useContext } from 'react';

import GlobalContext from "../utils/state/GlobalContext";
import { LRTitle, LRWrapper, LRSmall, LRSwitch, LRLink, LRCol, LRButton } from '../components/LR.styles';

import { ReactComponent as LoginPic } from "../imgs/LoginIcon.svg"
import PageContainer from '../components/PageContainer.component';

const Login = () => {
  const { dispatch } = useContext(GlobalContext);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [present] = useIonAlert();
  console.log(window.location.href)

  const onSubmitClick = async () => {

    var msg = "";
    let opts = {
      'username': username,
      'password': password
    }
    console.log(opts)

    await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(opts)
    }).then(r => r.json())
      .then(resp => {
        console.log(resp)
        if (resp.status === "ok") {
          dispatch({ type: "ADD_TOKEN", token: resp.token });
          msg = "Successfully logged in";
        }
        else if (resp.status === "bad") {
          msg = "Invalid password";
        }
      }).catch(() => {
        msg = "Invalid username";
      }).then(() => {
        return present({
          header: msg,
          buttons: [
            {
              text: 'Ok', handler: (d) => {
                window.location.href = ("/Profile")
              }
            }

          ],
        })
      })


  }

  return (
    <PageContainer>
      <IonRow
        style={{
          margin: "8vh",
        }}
      >
        <LRCol>
          <LoginPic style={{ width: "200px", height: "200px" }} />
          <LRTitle>Login to DevUp</LRTitle>

          <LRWrapper>
            <IonItem>
              <IonLabel position="floating">
                Username
              </IonLabel>
              <IonInput
                type="text"
                value={username}
                onIonChange={(e) =>
                  setUsername(e.target.value)
                }
                style={{
                  "color": "black"
                }}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating"> Password</IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) =>
                  setPassword(e.detargettail.value)
                }
              />
            </IonItem>

            <LRSmall>
              <LRLink to="/reset">Forgot password?</LRLink>
            </LRSmall>
          </LRWrapper>
          <LRButton onClick={onSubmitClick}>Login</LRButton>
          <LRSwitch>
            New to DevUp? <LRLink to="/register">Create an account</LRLink>
          </LRSwitch>
        </LRCol>
      </IonRow>
    </PageContainer>
  );
};

export default Login;
