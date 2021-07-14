import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { Container, TaskList, Title } from './styled'
import Task from '../Task';

export default class Column extends Component {
  showProps = () => {
    console.log(this.props)
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
            <Title
              {...provided.dragHandleProps}
              onClick={this.showProps}
            >
              {this.props.column.title}
            </Title>
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
          </Container>
        )}
      </Draggable>
    );
  }
}


