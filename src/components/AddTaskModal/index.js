import React from 'react';

import { Container } from './styled';
import { RiCloseFill } from 'react-icons/ri';
import { BsFilePlus } from 'react-icons/bs';

export default function AddTaskModal(props) {
  return (
    <Container>
      <div className="modal-box">
        <form onSubmit={props.handleAddTask}>
          <h3>Adicionar card</h3>
          <input type="text" autoFocus id="task-name" />
          <div className="actions">
            <button type="button" onClick={props.closeModal}>
              <RiCloseFill className="icon" />
              Cancelar
            </button>
            <button type="submit">
              <BsFilePlus className="icon" />
              Enviar
            </button>
          </div>
        </form>
      </div>
    </Container>
  )
}
