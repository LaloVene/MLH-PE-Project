import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import React from 'react';
import styled from 'styled-components'
import {ReactComponent as ProfileIcon} from "../imgs/ProfileIcon.svg"

const ProfileWrapper = styled.div`
    padding: 12px;
    margin: auto;
    display: flex;
`;

const Col3 = styled.div`
    width: 30%;
    margin: auto;
    text-align: center;
`;

const Col7 = styled(IonCard)`
    width: 70%;
    background-color: transparent;
    box-shadow: none;
`;


const Profile = ({ name, username, bio }) => {
    return (
        <div >
            <ProfileWrapper>
                <Col3>
                    <ProfileIcon style={{
                        width: "200px",
                        height: "200px"
                    }}
                        data-testid="profile-picture"
                    />
                </Col3>
                <Col7>
                    <IonCardHeader>
                        <IonCardTitle style={{ fontSize: "165%" }}><strong>{name}</strong></IonCardTitle>
                        <i><IonCardSubtitle>{username}</IonCardSubtitle></i>
                    </IonCardHeader>
                    <IonCardContent>
                        {bio}
                    </IonCardContent>
                </Col7>
            </ProfileWrapper>
        </div>
    );
};

export default Profile;
