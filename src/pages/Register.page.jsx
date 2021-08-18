import { useState } from 'react';
import { IonInput, IonItem, IonLabel, IonRow,useIonAlert, IonSelect, IonSelectOption } from '@ionic/react';
import { Formik } from 'formik';
import * as yup from 'yup';
import styled from "styled-components";
import React from 'react';

import { LRTitle, LRWrapper, LRSwitch, LRLink, LRCol, LRButton } from '../components/LR.styles'

import dblanguages from "../utils/languages.json";
import dbtopics from "../utils/topics.json";

import { ReactComponent as RegisterPic } from "../imgs/RegisterIcon.svg"
import PageContainer from '../components/PageContainer.component';

const ErrorMsg = styled.small`
  color: red;
  margin-left: 10px;
  display: block;
  max-width: 200px;
`

const validationSchema = yup.object({
  email: yup.string().nullable().email("Enter a valid email").required("Email is required"),
  name: yup.string().nullable().min(3, "Name should be a minimum of 3 characters long").required("Name is required"),
  username: yup.string().nullable().min(3, "Username should be a minimum of 3 characters long").required("Username is required"),
  password: yup.string().nullable().min(8, "Password should be a minimum of 8 characters long").required("Password is required"),
  github: yup.string().nullable().min(3, "Github username should be a minimum of 3 characters long").required("Github is required"),
})

const Register = () => {
  const [languages, setLanguages] = useState([]);
  const [topics, setTopics] = useState([]);

  const [present] = useIonAlert()

  const onSubmitClick = async ({ name, email, username, password, github }) => {
    console.log(languages)
    console.log(topics)

    var msg = ""
    let opts = {
      'name': name,
      'username': username,
      'password': password,
      'github': github,
      'email': email,
    }
    console.log(opts[name])

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

          if (resp.status === "ok") {
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
          if (resp.status === "ok") {
            console.log(resp.message)
          }
          else {
            console.log(resp.error)
          }
        })
    })

    await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(opts)
    }).then(r => r.json())
      .then(resp => {

        if (resp.status === "ok") {
          msg = "Success!"
        }
        else if (resp.status === "1") {
          msg = "Missing Fields"
        }
        else {
          console.log(resp)
          msg = resp.error
        }
      }).then(() => {
        return present({
          header: msg,
          buttons: [
            {
              text: 'Ok', handler: (d) => {
                window.location.href = ("/Login")
              }
            }

          ],
        })
      })



  }

  return (
    <PageContainer>

      <IonRow>
        <LRCol>
          <RegisterPic style={{
            width: "200px",
            height: "200px"
          }} />
          <LRTitle>
            Register for DevUp
          </LRTitle>
          <Formik
            initialValues={{
              name: null,
              email: null,
              username: null,
              password: null,
              github: null,

            }}

            validationSchema={validationSchema}
            onSubmit={values => {
              onSubmitClick(values);
            }}
          >
            {formikProps => (
              <>
                <LRWrapper>

                  <form onSubmit={formikProps.handleSubmit}>

                    <IonItem>
                      <IonInput
                        type="text"
                        name="name"
                        placeholder="Name*"
                        value={formikProps.values.name}
                        onIonChange={formikProps.handleChange}
                      />
                    </IonItem>
                    <ErrorMsg>
                      {formikProps.touched.name && formikProps.errors.name}
                    </ErrorMsg>

                    <IonItem>
                      <IonInput
                        type="email"
                        name="email"
                        placeholder="Email*"
                        value={formikProps.values.email}
                        onIonChange={formikProps.handleChange}
                      />
                    </IonItem>
                    <ErrorMsg>
                      {formikProps.touched.email && formikProps.errors.email}
                    </ErrorMsg>

                    <IonItem>
                      <IonInput
                        type="text"
                        name="username"
                        placeholder="Username*"
                        value={formikProps.values.username}
                        onIonChange={formikProps.handleChange}
                      />
                    </IonItem>
                    <ErrorMsg>
                      {formikProps.touched.username && formikProps.errors.username}
                    </ErrorMsg>

                    <IonItem>
                      <IonInput
                        type="password"
                        name="password"
                        placeholder="Password*"
                        value={formikProps.values.password}
                        onIonChange={formikProps.handleChange}
                      />
                    </IonItem>
                    <ErrorMsg>
                      {formikProps.touched.password && formikProps.errors.password}
                    </ErrorMsg>

                    <IonItem>
                      <IonInput
                        type="text"
                        name="github"
                        placeholder="Github*"
                        value={formikProps.values.github}
                        onIonChange={formikProps.handleChange}
                      />
                    </IonItem>
                    <ErrorMsg>
                      {formikProps.touched.github && formikProps.errors.github}
                    </ErrorMsg>

                    <IonItem style={{ width: "300px" }}>
                      <IonLabel>Languages</IonLabel>
                      <IonSelect value={languages} multiple={true} cancelText="Close" okText="Done"
                        onIonChange={e => setLanguages(e.target.value)}>
                        {
                          dblanguages.map(lang =>
                            <IonSelectOption value={lang}>{lang}</IonSelectOption>
                          )
                        }
                      </IonSelect>
                    </IonItem>

                    <IonItem style={{ width: "300px" }}>
                      <IonLabel>Interests</IonLabel>
                      <IonSelect value={topics} multiple={true} cancelText="Close" okText="Done"
                        onIonChange={e => setTopics(e.target.value)}>
                        {
                          dbtopics.map(topic =>
                            <IonSelectOption value={topic}>{topic}</IonSelectOption>
                          )
                        }
                      </IonSelect>
                    </IonItem>
                    <LRButton type="submit">Register</LRButton>
                  </form>
                </LRWrapper>
              </>
            )}

          </Formik>
          <LRSwitch>
            Already have an account? <LRLink to="/login">Login</LRLink>
          </LRSwitch>
        </LRCol>
      </IonRow>
    </PageContainer>

  );
};

export default Register;
