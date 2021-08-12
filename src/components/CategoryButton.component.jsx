import React from "react";
import styled from "styled-components";

const Button = styled.button`
  font-size: 1rem;
  padding: 1.3rem 1.1rem;
  background: #fbd09e;
  color: black;
  border-radius: 2rem;
  margin: 0.5rem;

  &:hover {
    background: #e2b684;
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
