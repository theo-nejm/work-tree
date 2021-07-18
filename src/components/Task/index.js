import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Container } from './styled';
import DateDisplay from '../DateDisplay';

export default function Task(props) {
  function formatDate(date) {
    const splittedDate = date.split('-'), orderedDate = splittedDate.reverse()
    return orderedDate.join('/');
  }

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
          <div
            className="clickable"
            onClick={props.handleClick}
            id={props.task.id}
          >
            {props.task.content}
          </div>
          {
            props.task.date ?
            <DateDisplay
              date={formatDate(props.task.date)}
              currentDate={props.currentDate}
            /> :
            null
          }
        </Container>
      )}
    </Draggable>
  );
}
