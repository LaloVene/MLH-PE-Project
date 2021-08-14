import styled from "styled-components";
import { IonPage, IonContent } from "@ionic/react";
import { PageWrapper, Title } from './PageComponentStyles';
import Header from './Header.component';

function PageContainer(props) {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <PageWrapper>
          {props.title ? <Title title={props.title} /> : <></>}
          {props.children}
        </PageWrapper>
      </IonContent>
    </IonPage>

  )
}

export default PageContainer;
