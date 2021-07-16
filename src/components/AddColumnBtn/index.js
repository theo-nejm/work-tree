import React from 'react';
import { Button } from './styled';
import { BiPlus } from 'react-icons/bi';


export default function AddColumn(props) {
  return (
    <Button onClick={props.handleClick}>
      <BiPlus />
      Novo grupo
    </Button>
  )
}
