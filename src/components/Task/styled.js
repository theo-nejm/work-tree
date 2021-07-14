import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid lightgray;
  border-radius: .125rem;
  padding: .5rem;
  margin-bottom: .5rem;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
  display: flex;
`

export const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: .25rem;
  margin-right: .5rem;
  cursor: pointer;
`
