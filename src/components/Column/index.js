import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { firebaseDatabase } from '../../backend/config/firebaseConfig';

import { Container, TaskList, Title } from './styled'
import Task from '../Task';
import AddTaskButton from '../AddTaskButton';
import EditColumnInput from '../EditColumnInput'

const dbRefference = firebaseDatabase.ref(`state`)

export default class Column extends React.Component {
  state = {
    idEditTitle: false,
    currentTitle: this.props.column.title,
  }

  handleToggleEdit = () => {
    const newState = {
      ...this.state,
      isEditTitle: !this.state.isEditTitle
    }

    this.setState(newState)
  }

  handleEditTitle = async (event) => {
    event.preventDefault()
    const newTitle = document.querySelector(`.${this.props.column.id}`).value;
    if(!newTitle) {
      this.setState({
        isEditTitle: !this.state.isEditTitle,
      })

      return;
    }
    const newState = {
      currentTitle: newTitle,
      isEditTitle: !this.state.isEditTitle,
    }
    const dbSnapshot = (await dbRefference.get(`state`)).val()
    dbSnapshot.columns[this.props.column.id].title = newTitle;
    const newData = dbSnapshot;

    dbRefference.set(newData)
    this.setState(newState)
  }

  render() {
  return (
    <Draggable draggableId={this.props.column.id} index={this.props.index}>
      {provided => (
        <Container
          {...provided.draggableProps}
          innerRef={provided.innerRef}
          ref={provided.innerRef}
          tasks={this.props.tasks}
        >
          {
            !this.state.isEditTitle ?
            <Title onClick={this.handleToggleEdit} {...provided.dragHandleProps}>
            {this.state.currentTitle}
            </Title> :
            <EditColumnInput
              handleBlur={this.handleToggleEdit}
              handleSubmit={this.handleEditTitle}
              classValue={this.props.column.id}
            />
          }
          <Droppable droppableId={this.props.column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                innerRef={provided.innerRef}
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {this.props.tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
          <AddTaskButton
            index={this.props.column.id}
            handleAddTask={this.props.handleAddTask}
            handleClickAddTask={this.props.handleClickAddTask}
          />
        </Container>
      )}
    </Draggable>
  );
}
}


