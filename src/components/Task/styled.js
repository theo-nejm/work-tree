import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid lightgray;
  border-radius: .125rem;
  padding: .5rem;
  margin-bottom: .5rem;
  background-color: ${props => (props.isDragging ? '#dfffdf' : 'white')};
  display: flex;
  flex-direction: column;
`
