import React from "react";
import styled from "styled-components";

const Form = styled.form`
`;
const Input = styled.input`
  width: 100%;
  background-color: hsl(0, 0%, 91.37254901960785%);
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 2rem;
  outline: none;
`;

function Searchbar(props) {
  const { placeholder, onChange, onSubmit } = props;
  return (
    <Form onSubmit={onSubmit}>
      <Input placeholder={placeholder} onChange={onChange} />
    </Form>
  );
}

export default Searchbar;
