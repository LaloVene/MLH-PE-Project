import styled from "styled-components";

const LRButton = styled.button`
    font-size: 1rem;
    padding: 1rem 1rem;
    background: #86a5ff;
    color: #ffffff;
    border-radius: 1rem;
    margin: 0.5rem;
    width: 220px;
    &:hover {
        background: #5c7cdd;
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
