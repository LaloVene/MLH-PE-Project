import { IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert, IonSelect, IonSelectOption, IonButton } from '@ionic/react';
import React, { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import dblanguages from "../utils/languages.json";
import dbtopics from "../utils/topics.json";
import { LRTitle, LRWrapper, LRSwitch, LRLink, LRCol, LRButton } from '../components/LRStyles' 
import { register } from '../serviceWorkerRegistration';
import { useForm, Controller } from "react-hook-form";
import * as yup from 'yup';
import { Field, useFormik, ErrorMessage, Formik } from 'formik';
import styled from "styled-components";

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
  github: yup.string().nullable().min(3, "Github should be a minimum of 3 characters long"),

})

const Register: React.FC = () => {
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [github, setGithub] = useState('')
  // const [languages, setLanguages] = useState<string[]>([]);
  // const [topics, setTopics] = useState<string[]>([]);

  // const [present] = useIonAlert()

  // const onSubmitClick = async (e: { preventDefault: () => void; }) => {
  //   e.preventDefault()
  //   var msg = ""
  //   let opts = {
  //     'name': name,
  //     'username': username,
  //     'password': password,
  //     'github': github,
  //     'email': email,
  //   }

  //   const showError = (_fieldName: string) => {
  //     {
  //       return (
  //         (errors as any)[_fieldName] && (
  //           <div
  //             style={{
  //               color: "red",
  //               padding: 5,
  //               paddingLeft: 12,
  //               fontSize: "smaller"
  //             }}
  //           >
  //             This field is required
  //           </div>
  //         )
  //       );
  //     }
  //   };

  //   languages.forEach(function (lang) {
  //     fetch('/api/addUserLanguage', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         'username': username,
  //         'language': lang
  //       })
  //     }).then(r => r.json())
  //       .then(resp => {

  //         if (resp.status == "ok") {
  //           console.log(resp.message)
  //         }
  //         else {
  //           console.log(resp.error)
  //         }
  //       })
  //   })

  //   topics.forEach(function (topic) {
  //     fetch('/api/addUserTopic', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         'username': username,
  //         'topic': topic
  //       })
  //     }).then(r => r.json())
  //       .then(resp => {

  //         console.log(topic)
  //         if (resp.status == "ok") {
  //           console.log(resp.message)
  //         }
  //         else {
  //           console.log(resp.error)
  //         }
  //       })
  //   })

  //   const finalresp = await fetch('/api/register', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'

  //     },
  //     body: JSON.stringify(opts)
  //   }).then(r => r.json())
  //     .then(resp => {

  //       if (resp.status == "ok") {
  //         msg = "Success!"
  //         setTimeout(() => window.location.href = ("/Login"), 3000)
  //       }
  //       else if (resp.status == "1") {
  //         msg = "Missing Fields"
  //       }
  //       else {
  //         console.log(resp)
  //         msg = resp.error
  //       }
  //     })

  //   return present({
  //     cssClass: 'my-css',
  //     header: msg,
  //     message: "",
  //     buttons: [
  //       'Ok',
  //     ],
  //     onDidDismiss: () => {
  //       if (msg == "Success!") {
  //         window.location.href = ("/Login")
  //       }
  //     },
  //   })
  // }

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
        <IonRow style={{
          margin: "25px"
        }}>
          <LRCol>

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
              languages: null,
              topics: null,
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
              console.log(values);
              alert(JSON.stringify(values, null, 2));
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
                  <ErrorMsg className="error">
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
                  <ErrorMsg className="error">
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
                  <ErrorMsg className="error">
                    {formikProps.touched.username && formikProps.errors.username}
                  </ErrorMsg>

                  <IonItem>
                    <IonInput
                    type="text"
                    name="password"
                    placeholder="Password*"
                    value={formikProps.values.password}
                    onIonChange={formikProps.handleChange}
                    />
                  </IonItem>
                  <ErrorMsg className="error">
                    {formikProps.touched.password && formikProps.errors.password}
                  </ErrorMsg>

                  <IonItem>
                    <IonInput
                    type="text"
                    name="github"
                    placeholder="Github"
                    value={formikProps.values.github}
                    onIonChange={formikProps.handleChange}
                    />
                  </IonItem>
                  <ErrorMsg className="error">
                    {formikProps.touched.github && formikProps.errors.github}
                  </ErrorMsg>
                <IonItem>
                  <IonLabel>Languages</IonLabel>
                  <IonSelect value={formikProps.values.languages} multiple={true} cancelText="Close" okText="Done" onIonChange={formikProps.handleChange}>
                  {
                    dblanguages.map(lang =>
                      <IonSelectOption value={lang}>{lang}</IonSelectOption>
                    )
                  }
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel>Interests</IonLabel>
                  <IonSelect value={formikProps.values.topics} multiple={true} cancelText="Close" okText="Done" onIonChange={formikProps.handleChange}>
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

                <div>
                  <p>VALUES</p>
                  <pre>{JSON.stringify(formikProps.values, null, 2)}</pre>
                  <p>ERRORS</p>
                  <pre>{JSON.stringify(formikProps.errors, null, 2)}</pre>

                </div>
                </>
              )}

            </Formik>


          </LRCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Register;
