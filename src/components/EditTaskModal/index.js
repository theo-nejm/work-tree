import React from 'react';

import { RiCloseFill } from 'react-icons/ri';
import { BsFilePlus } from 'react-icons/bs';
import { Container } from './styled';

export default function EditTaskModal(props) {
  return (
    <Container>
      <div className="modal-box">
        <form onSubmit={props.handleSubmit}>
          <div className="header">
            <h3>Editar card</h3>
            <button
              className="delete"
              onClick={props.handleDelete}
              id={`delete-${props.workingWith.id}`}
              type='button'
            >
              apagar
            </button>
          </div>
          <input
            type="text"
            autoFocus
            id={`edit-${props.workingWith.id}`}
            defaultValue={props.workingWith.content}
          />
          <input
            type="date"
            id={`edit-${props.workingWith.id}-date`}
            defaultValue={props.workingWith.date}
          />
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
