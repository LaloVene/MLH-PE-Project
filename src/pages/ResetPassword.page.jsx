import React from 'react';
import { IonContent, IonHeader, IonInput, IonItem, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert, useIonToast } from '@ionic/react';
import { Formik } from 'formik';
import * as yup from 'yup';
import styled from "styled-components";

import { LRTitle, LRWrapper, LRCol, LRButton } from '../components/LRStyles' 
import Header from '../components/Header.component';

import { ReactComponent as RegisterPic } from "../components/RegisterIcon.svg"

const ErrorMsg = styled.small`
  color: red;
  margin-left: 10px;
  display: block;
  max-width: 200px;
`

const validationSchema = yup.object({
  password: yup.string().nullable().min(8, "Password should be a minimum of 8 characters long").required("Password is required"),
})

const ResetPassword = ({match, location, history}) => {
  const [presentToast, dismissToast] = useIonToast();
  const [presentAlert, dismissAlert] = useIonAlert();

  const resetPasswort = async (user, password, token) => {
    try {
      const response = await fetch('/api/resetPassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'username': user,
            'password': password,
            'token': token
          })
        });
      const data = await response.json();
      console.log(data)
      if (!data.error) {
        presentToast({
          buttons: [{ text: 'hide', handler: () => dismissToast() }],
          message: 'Password Changed'
        })
        history.push("/login");
      } else {
        presentAlert({
          buttons: [{ text: 'Ok', handler: () => dismissAlert() }],
          message: 'Error: Token not valid'
        })
      }
    } catch (error) {
      presentAlert({
        buttons: [{ text: 'Ok', handler: () => dismissAlert() }],
        message: 'Error: Token not valid'
      })
    }
  }

  const onSubmitClick = async ({password}) => {
    let user = match.params.user
    let token = new URLSearchParams(location.search).get('token')
    resetPasswort(user, password, token);
  }

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Reset Password</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRow>
          <LRCol>
          <RegisterPic style={{width: "200px", height: "200px"}} />
          <LRTitle>
              Reset Password
          </LRTitle>
            <Formik
            initialValues={{password: null,}}
            validationSchema={validationSchema}
            onSubmit={values => {
              onSubmitClick(values);
            }}
            >
              {formikProps => (
                <LRWrapper>
                  <form onSubmit={formikProps.handleSubmit}>
                    <IonItem>
                      <IonInput
                      type="password"
                      name="password"
                      placeholder="New Password"
                      value={formikProps.values.password}
                      onIonChange={formikProps.handleChange}
                      />
                    </IonItem>
                    <ErrorMsg>
                      {formikProps.touched.password && formikProps.errors.password}
                    </ErrorMsg>
                  <LRButton type="submit">Reset Password</LRButton>
                  </form>
                </LRWrapper>
              )}

            </Formik>
          </LRCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default ResetPassword;
