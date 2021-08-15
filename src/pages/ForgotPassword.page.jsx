import { IonInput, IonItem, IonRow, useIonAlert } from '@ionic/react';
import { Formik } from 'formik';
import * as yup from 'yup';
import styled from "styled-components";

import { LRTitle, LRWrapper, LRCol, LRButton } from '../components/LRStyles'
import PageContainer from '../components/PageContainer';
import { ReactComponent as RegisterPic } from "../imgs/RegisterIcon.svg";

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

  const resetPassword = async (user) => {
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
          header: 'Email sent!',
          message: 'Please check your Inbox and Spam for a link to reset your password.'
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

  const onSubmitClick = async ({ username }) => {
    resetPassword(username);
  }

  return (
    <PageContainer>
      <IonRow>
        <LRCol>
          <RegisterPic style={{ width: "200px", height: "200px" }} />
          <LRTitle>
            Forgot Password
          </LRTitle>
          <Formik
            initialValues={{ username: null, }}
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
                  <LRButton type="submit">Send email</LRButton>
                </form>
              </LRWrapper>
            )}

          </Formik>
        </LRCol>
      </IonRow>
    </PageContainer>

  );
};

export default ForgotPassword;
