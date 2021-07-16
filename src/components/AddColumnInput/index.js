import React from 'react';
import { Form } from './styled';

export default function AddColumnInput(props) {
  return (
    <Form onSubmit={props.handleSubmit}>
      <input type="text" id="column-name" autoFocus onBlur={props.handleBlur}/>
    </Form>
  )
}
