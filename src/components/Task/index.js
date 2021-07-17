import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Container } from './styled';

import { firebaseDatabase } from '../../backend/config/firebaseConfig';

const dbRefference = firebaseDatabase.ref(`state`)

export default class Task extends React.Component {
  state = {
    isEditTask: false,
  }

  editTask = async () => {
    const dbSnapshot = (await dbRefference.get(`state`)).val()
    console.log(dbSnapshot.tasks[this.props.task.id])
  }

  render() {
  return (
    <Draggable draggableId={this.props.task.id} index={this.props.index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {this.props.task.content}
        </Container>
      )}
    </Draggable>
  );
  }
}
