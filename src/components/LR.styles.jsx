import styled from "styled-components";
import { Link } from 'react-router-dom';
import { IonCol } from '@ionic/react';
import React from 'react';

const LRTitle = styled.h3`
    margin-bottom: 24px;
    margin-top: 24px;
`;

const LRWrapper = styled.div`
    margin-bottom: 12px;
`;

const LRSmall = styled.small`
  margin-left: 10px;
`;

const LRSwitch = styled.p`
  border-top: black;
`;

const LRLink = styled(Link)`
  text-decoration: none;
`

const LRCol = styled(IonCol)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin:auto;  
`;

const LRButton = styled.button`
    font-size: 1rem;
    padding: 1rem 1rem;
    background: #86a5ff;
    color: #ffffff;
    border-radius: 1rem;
    margin: 1rem 2rem;
    width: 220px;
    &:hover {
        background: #5c7cdd;
  }
`;

export {LRTitle, LRWrapper, LRSmall, LRSwitch, LRLink, LRCol, LRButton};
