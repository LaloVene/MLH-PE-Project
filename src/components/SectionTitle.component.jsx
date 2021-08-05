import React from "react";
import styled from "styled-components";

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1rem 0;
`;

function SectionTitle(props) {

  return (
    <Title>
      {props.children}
    </Title>
  );
}

export default SectionTitle;
