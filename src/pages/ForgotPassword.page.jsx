import React from 'react';
import { IonContent, IonHeader, IonInput, IonItem, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import { Formik } from 'formik';
import * as yup from 'yup';
import styled from "styled-components";

import { LRTitle, LRWrapper, LRCol, LRButton } from '../components/LRStyles' 
import Header from '../components/Header.component';

import { ReactComponent as RegisterPic } from "../imgs/RegisterIcon.svg"

const ErrorMsg = styled.small`
  color: red;
  margin-left: 10px;
  display: block;
  max-width: 200px;
`

const validationSchema = yup.object({
  username: yup.string().nullable().min(3, "Username should be a minimum of 3 characters long").required("Username is required"),
})

const ForgotPassword = () => {
  const [presentAlert, dismissAlert] = useIonAlert();

  const resetPasswort = async (user) => {
    try {
      const response = await fetch('/api/requestReset', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'username': user,
          })
        });
      const data = await response.json();
      console.log(data)
      if (!data.error) {
        presentAlert({
          buttons: [{ text: 'Ok', handler: () => dismissAlert() }],
          header: 'Email Send',
          message: 'Please check your Email and Spam.'
        })
      } else {
        presentAlert({
          buttons: [{ text: 'Ok', handler: () => dismissAlert() }],
          message: 'Error: Username not valid'
        })
      }
    } catch (error) {
      presentAlert({
        buttons: [{ text: 'Ok', handler: () => dismissAlert() }],
        message: 'Error: Username not valid'
      })
    }
  }

  const onSubmitClick = async ({username}) => {
    resetPasswort(username);
  }

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Forgot Password</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRow>
          <LRCol>
          <RegisterPic style={{width: "200px", height: "200px"}} />
          <LRTitle>
              Forgot Password
          </LRTitle>
            <Formik
            initialValues={{username: null,}}
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
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={formikProps.values.username}
                      onIonChange={formikProps.handleChange}
                      />
                    </IonItem>
                    <ErrorMsg>
                      {formikProps.touched.username && formikProps.errors.username}
                    </ErrorMsg>
                  <LRButton type="submit">Send Email</LRButton>
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

export default ForgotPassword;
