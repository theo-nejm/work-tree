import React from 'react';

import { Container } from './styled';
import { AiOutlineClockCircle } from 'react-icons/ai';

export default function DateDisplay(props) {
  return (
    <Container>
      <AiOutlineClockCircle />
      {props.date}
    </Container>
  )
}
