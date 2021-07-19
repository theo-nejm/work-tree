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
  backface-visibility: hidden;

  h2 {
    display: flex;
    align-items: center;
    justify-content: center;

    color: white;

    svg {
      margin-right: .5rem;
    }
  }

  .bell {
    fill: white;

    height: 1.5rem;
    width: 1.5rem;

    cursor: pointer;

    padding: .25rem;
    border: 2px solid white;
    border-radius: .25rem;
  }
`
export const SearchWrapper = styled.div`
  height: max-content;
  position: relative;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 500px) {
      display: none;
  }
`
export const SearchField = styled.form`
  box-sizing: border-box;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16rem;
  max-width: 15rem;
  background: white;
  padding: .5rem;
  border: 1px solid lightgray;
  border-radius: .25rem;
  position: absolute;
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
    width: 16rem;

    border: none;
    outline: none;

    color: #172B4D;
    z-index: 4;
  }
`

export const ResultsWrapper = styled.ul`
  list-style: none;
  background: #f4f4f4;
  margin-left: 2.2rem;
  width: 12rem;

  margin-top: .95rem;

  height: max-content;

  border: 1px solid lightgray;
  border-top: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, .15);
  position: absolute;
  top: 0;
  z-index: 3;

  border-radius: 0 0 .25rem .25rem;
`

export const TaskWrapper = styled.div`
  height: max-content;
  padding: .5rem;
  width: 12.85rem;
  margin: .25rem 0rem .25rem -2.25rem;
  background: white;
  border-radius: .2rem;

  border: 1px solid lightgray;
  h4 {
    font-weight: 500;
  }

  .date-display {
    display: flex;
    align-items: center;

    svg {
      margin-right: .2rem;
    }
  }
`
