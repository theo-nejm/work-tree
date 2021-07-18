import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Container } from './styled';
import DateDisplay from '../DateDisplay';

import { firebaseDatabase } from '../../backend/config/firebaseConfig';

const dbRefference = firebaseDatabase.ref(`state`)

export default class Task extends React.Component {
  state = {
    isChecked: false,
  }

  componentDidMount = async () => {
    const dbSnapshot = (await dbRefference.get(`state`)).val()
    if(!dbSnapshot.tasks[this.props.task.id].date) return;
    const el = document.getElementById(`check-${this.props.task.id}`)
    el.checked = dbSnapshot.tasks[this.props.task.id].isChecked

    this.setState({
      ...this.state,
      isChecked: dbSnapshot.tasks[this.props.task.id].isChecked,
    })
  }

  handleCompleteTask = async event => {
    const dbSnapshot = (await dbRefference.get(`state`)).val()
    const el = event.target
    const id = el.id.replace('check-', '');

    dbSnapshot.tasks[id].isChecked = !dbSnapshot.tasks[id].isChecked

    dbRefference.set(dbSnapshot)
    this.setState({
      ...this.state,
      isChecked: dbSnapshot.tasks[id].isChecked,
    })
  }

  formatDate(date) {
    const splittedDate = date.split('-'), orderedDate = splittedDate.reverse()
    return orderedDate.join('/');
  }

  render(){
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
          <div
            className="clickable"
            onClick={this.props.handleClick}
            id={this.props.task.id}
          >
            {this.props.task.content}
          </div>
          {
            this.props.task.date ?
            <DateDisplay
              date={this.formatDate(this.props.task.date)}
              currentDate={this.props.currentDate}
              taskId={this.props.task.id}
              checkTask={this.handleCompleteTask}
              isChecked={this.state.isChecked}
            /> :
            null
          }
        </Container>
      )}
    </Draggable>
  );
  }
}
