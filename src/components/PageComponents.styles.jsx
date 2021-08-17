import styled from 'styled-components';
import { IonRow, IonSelect, IonChip } from '@ionic/react';

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 1rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1rem 0;
`;

const SearchBarContainer = styled.h1`
  max-width: 20rem;
  font-size: 1rem;
  padding-left: 1rem;
`;

const Separator = styled.div`
  margin: 3rem 0;
`;

const SmallTitle = styled.h4`
  margin-bottom: 12px;
  margin-top: 36px;
  text-align: center;
  font-weight: bold;
`;

const Section = styled.div`
  width: 50%;
  position: relative;
`
const TagSection = styled(IonRow)`
  align-items: center;
  justify-content: center;
  text-align: center;
`

const EditIcon = styled.button`
  background-color: rgba(0,0,0,0);
  color: black;
  font-size: 1.1rem;
  &:hover {
    color: grey;
  }
`;

const ProfileDetailsSelect = styled(IonSelect)`
  height: 40px;
  width: 500px;
  margin-left: 20px;
  max-width: 55%;
  margin-top: 16px;
`

const SelectButtonRow = styled(IonRow)`
  align-items: center;
  margin-top: 10px;
`

const ProfileChip = styled(IonChip)`
  background-color: #f1c0f1;
`

export { PageWrapper, SearchBarContainer, Separator, Title, SmallTitle, Section, TagSection, EditIcon, ProfileDetailsSelect, SelectButtonRow, ProfileChip };