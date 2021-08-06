import React from "react";
import styled from "styled-components";

const Button = styled.button`
  font-size: 1.2rem;
  padding: 1.5rem 1rem;
  background: hsl(0, 0%, 95%);
  color: black;
  border-radius: 2rem;
  margin: 0.5rem;

  &:hover {
    background: hsl(0, 0%, 90%);
  }
`;

function CategoryButton(props) {
  console.log(props)
  return (
    <Button>
      {props.children}
    </Button>
  );
}

export default CategoryButton;
