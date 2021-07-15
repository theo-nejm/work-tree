import styled from "styled-components";

export const Container = styled.div`
  * {
    box-sizing: border-box;
  }

  height: 100vh;
  width: 100vw;
  position: fixed;
  background: rgba(0, 0, 0 , .5);
  top: 0;
  left: 0;

  .modal-box form {
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translateX(-50%) translateY(-50%);

    width: 16rem;
    height: 10rem;

    background: white;

    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;

    padding: 1rem;

    border-radius: .25rem;

    input {
      height: 2rem;
      width: 100%;
      border: 2px solid lightgrey;
      border-radius: .25rem;
      transition: .2s ease;
      outline: none;
      padding: 0 .5rem;

      &:focus {
        border: 2px solid #0098cc;
      }
    }

    .actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    button {
      height: 2rem;
      width: 6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: .25rem;
      cursor: pointer;
      font-weight: 500;
    }

    button:nth-child(1) {
      background: none;
      border: 2px solid #ab2e46;
      color: #ab2e46;
    }

    button:nth-child(2) {
      background: #0098cc;
      border: none;
      color: white;
    }

    button .icon {
      font-size: 1.1rem;
      margin-right: .4rem;
    }
  }

`
