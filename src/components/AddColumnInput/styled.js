import styled from "styled-components";



export const Form = styled.form`
  box-sizing: border-box;

  margin: .5rem;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 12rem;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  padding: .5rem;

  font-size: 1rem;
  color: #0098cc;
  outline: none;

  background: #65abb9;

  &:focus {
    border: 1px solid #0098cc;
  }

  input {
    width: 100%;
    border: none;
    outline: none;
    background: none;

    font-size: 1.2rem;
    font-weight: bold;
    color: white;
  }
`
