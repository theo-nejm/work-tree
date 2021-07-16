import React from 'react';
import { Container } from './styled';

export default function EditColumnInput(props) {
  return (
    <Container>
      <form onSubmit={props.handleSubmit}>
        <input
          type="text"
          autoFocus
          onBlur={props.handleBlur}

          className={props.classValue}
        />
      </form>
    </Container>
  )
}
