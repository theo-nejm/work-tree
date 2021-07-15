import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Container } from './styled';


export default function Task(props) {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {props.task.content}
        </Container>
      )}
    </Draggable>
  );
}
