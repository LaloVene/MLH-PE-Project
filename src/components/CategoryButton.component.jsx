import React from "react";
import styled from "styled-components";

const Button = styled.button`
  font-size: 1rem;
  padding: 1.3rem 1.1rem;
  background: #ffe1be;
  color: black;
  border-radius: 2rem;
  margin: 0.5rem;

  &:hover {
    background: #f0cfaa;
  }
`;

function CategoryButton(props) {
  return (
    <Button>
      {props.children}
    </Button>
  );
}

export default CategoryButton;
