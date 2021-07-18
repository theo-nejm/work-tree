import styled from "styled-components";

export const Container = styled.div`
  box-sizing: border-box;
  background: ${props => props.bgColor};
  color: ${props => props.color};
  height: 1.4rem;
  width: max-content;
  border: 1px solid lightgray;
  border-radius: .25rem;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: .25rem;

  margin-top: .25rem;
`
