import styled from "styled-components";

export const Container = styled.div`
  margin: .5rem;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 12rem;
  background: white;

  display: flex;
  flex-direction: column;
  height: max-content;
`;

export const Title = styled.h3`
  padding: 8px;
  background: #65abb9;
  color: white;
  font-size: 1.2rem;
`;

export const TaskList = styled.div`
  padding: 8px;
  background-color: ${props => props.isDraggingOver ? '#a9dffcaa' : 'inherit'};
  transition: background-color .2s ease;
`;

export const RemoveModal = styled.div`
  box-sizing: border-box;

  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .5);

  position: absolute;
  left: 0%;
  top: 0%;

  div.modal-wrapper {
    width: 16rem;
    height: 9rem;
    background: #FFF;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: .25rem;
    padding: 1rem 1.5rem;

    .text {
      height: 5.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      h3 {
        font-size: 1.5rem;
        color: #ff2211;
        margin-bottom: -.5rem;
        text-align: center;
      }

      p {
        text-align: center;
        font-size: 1rem;
      }
    }

    .actions {
      display: flex;
      flex-direction: row;
      height: 2.4rem;
      align-items: center;
      width: 100%;

      justify-content: space-between;

      button {
        font-weight: bold;
        height: 90%;
        cursor: pointer;
        width: 40%;
        border-radius: .25rem;

        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          font-size: 1.2rem;
        }
      }

      button:nth-child(1) {
        background: none;
        border: 2px solid #2e2e2e;
        color: #2e2e2e;
      }

      button:nth-child(2) {
        background: #ff2211;
        border: none;
        color: white;
        svg {
          font-size: 1rem;
          margin-right: .25rem;
        }
      }
    }
  }
`
