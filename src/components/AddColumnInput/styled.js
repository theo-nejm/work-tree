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
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

      height: max-content;
      width: 10rem;
      border: none;
      outline: none;
      background: none;

      padding: .5rem;

      margin-left: -.5rem;

      color: white;
      font-weight: 500;
      font-size: 1.2rem;
    }
`
