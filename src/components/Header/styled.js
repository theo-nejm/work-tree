import styled from "styled-components";

export const Container = styled.header`
  box-sizing: border-box;

  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 1rem;

  background: #65abb9;

  position: fixed;
  width: 100vw;

  h2 {
    display: flex;
    align-items: center;
    justify-content: center;

    color: white;

    svg {
      margin-right: .5rem;
    }
  }

  .notifications {
    fill: white;

    height: 1.75rem;
    width: 1.75rem;

    cursor: pointer;
  }
`
export const SearchWrapper = styled.form`
  box-sizing: border-box;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20vw;
  max-width: 15rem;
  background: white;
  margin-top: 0;
  padding: .5rem;
  border: 1px solid lightgray;
  border-radius: .25rem;
  position: relative;
  margin-left: 2rem;

  svg {
    box-sizing: border-box;
    height: 2rem;
    width: 2rem;
    padding: .4rem;
    border-radius: .25rem 0 0 .25rem;

    background: #d2d2d2;
    margin-left: -1.75rem;
    fill: #172B4D;
    position: absolute;
    left: 0;

    cursor: pointer;
  }

  input {
    box-sizing: border-box;
    height: 1.6rem;
    margin-bottom: 0;
    padding-left: .5rem;
    width: 20vw;

    border: none;
    outline: none;

    color: #172B4D;
  }
`
