import styled from 'styled-components'
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";

interface ContainerProps {
    username: string;
    title: string;
    description: string;
}

const Card = styled(IonCard)`
    border-radius: 30px;
    background-color: papayawhip;
`;

const ProjectCard: React.FC<ContainerProps> = ({ username, title, description }) => {
  return (
    <div className="container">
          <Card>
              <IonCardHeader>
                  <IonCardSubtitle>
                    {username}
                  </IonCardSubtitle>
                  <IonCardTitle>
                    {title}
                  </IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                  {description}
              </IonCardContent>
          </Card>
    </div>
  );
};

export default ProjectCard;
