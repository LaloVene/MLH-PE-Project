import { IonPage, IonContent } from "@ionic/react";
import { PageWrapper } from './PageComponentStyles';
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
