import React from 'react';
import styled from 'styled-components'

interface ContainerProps {
  text: string;
}

const TagBubble = styled.div`
    border-radius: 30px;
    background-color: #e1daf6;
    margin: 6px 10px;
    display: inline-flex;
    padding: 16px;
`;


const Tag: React.FC<ContainerProps> = ({ text }) => {
  return (
    <TagBubble>
      {text}
    </TagBubble>
  );
};

export default Tag;
