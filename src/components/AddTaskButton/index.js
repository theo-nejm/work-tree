import React from 'react';
import { BiPlus } from 'react-icons/bi';
import { Container } from './styled';

export default function AddTaskButton(props) {
  return (
    <Container>

      <button
        id={props.index}
        onClick={props.handleClickAddTask}
      >
        <BiPlus />
        Novo card
      </button>
    </Container>
  )
}
