import styled from "styled-components";

const LRButton = styled.button`
    font-size: 1rem;
    padding: 1rem 1rem;
    background: #EEF1FA;
    color: black;
    border-radius: 2rem;
    margin: 0.5rem;
    &:hover {
        background: hsl(0, 0%, 90%);
  }
`;

function Button(props) {
    console.log(props)
    return (
        <Button>
            {props.children}
        </Button>
    );
}

export default LRButton;
