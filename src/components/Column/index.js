import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { Container, TaskList, Title } from './styled'
import Task from '../Task';
import AddTaskButton from '../AddTaskButton';

export default function Column(props) {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {provided => (
        <Container
          {...provided.draggableProps}
          innerRef={provided.innerRef}
          ref={provided.innerRef}
          tasks={props.tasks}
        >
          <Title
            {...provided.dragHandleProps}
          >
            {props.column.title}
          </Title>
          <Droppable droppableId={props.column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                innerRef={provided.innerRef}
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {props.tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
          <AddTaskButton
            index={props.column.id}
            handleAddTask={props.handleAddTask}
            handleClickAddTask={props.handleClickAddTask}
          />
        </Container>
      )}
    </Draggable>
  );
}


