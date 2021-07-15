import styled from "styled-components";

export const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 10rem;
  background: white;

  display: flex;
  flex-direction: column;
  height: max-content;
`;

export const Title = styled.h3`
  padding: 8px;
`;

export const TaskList = styled.div`
  padding: 8px;
  background-color: ${props => props.isDraggingOver ? 'skyblue' : 'inherit'};
  transition: background-color .2s ease;
`;

