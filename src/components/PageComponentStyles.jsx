import styled from 'styled-components';

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

export { PageWrapper, SearchBarContainer, Separator, Title};