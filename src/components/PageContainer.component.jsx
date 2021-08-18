import React from 'react';

import { IonPage, IonContent } from "@ionic/react";
import { PageWrapper } from './PageComponents.styles';
import Header from './Header.component';

function PageContainer(props) {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <PageWrapper>
          {props.children}
        </PageWrapper>
      </IonContent>
    </IonPage>

  )
}

export default PageContainer;
