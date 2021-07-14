import styled, { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }
  body {
    font-family: --apple-system, 'Roboto', BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif, serif;
    background: #f5f99B;
    overflow-x: hidden;
  }
  html, body, #root {
    height: 100%;
  }
  button {
    cursor: pointer;
    border: none;
    color: #fff;
    font-size: .9rem;
    padding: .6rem 1rem;
    border-radius: .25rem;
    font-weight: 700;
    display: flex;
    align-items: center;
  }
  a {
    text-decoration: none;
  }
  ul {
    list-style: none;
  }
  .sr-only {
    height: 1px;
    width: 1px;
    opacity: 0;
    position: absolute;
    top: -1px;
    left: -1px;
  }
`;

export const Container = styled.div`
  display: flex;
  height: auto;
`
