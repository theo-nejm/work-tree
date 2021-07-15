import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { firebaseDatabase } from './backend/config/firebaseConfig';
import AddTaskModal from './components/AddTaskModal';
import Column from './components/Column';
import { Container } from './styles/GlobalStyles'

const dbRefference = firebaseDatabase.ref(`state`)

export default class App extends React.Component {
  state = {
    tasks: {},
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'To do',
        taskIds: [],
      },
      'column-2': {
        id: 'column-2',
        title: 'In progress',
        taskIds: [],
      },
      'column-3': {
        id: 'column-3',
        title: 'Done',
        taskIds: [],
      },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
    isAddTask: false,
    workingWith: null,
  };

  componentDidMount = () => {
    dbRefference.on('value', (snapshot) => {
      const data = snapshot.val();
      const columns = data.columns;
      const columnsArr = Object.keys(columns)
      for(let column of columnsArr) {
        const taskIds = !columns[column].taskIds ? [] : columns[column].taskIds
        columns[column].taskIds = taskIds
      }

      this.setState(data)
    });
  }

  // componentWillUpdate = () => {
  //   dbRefference.on('value', (snapshot) => {
  //     const data = snapshot.val();
  //     this.setState(data)
  //   });
  // }

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(this.state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        columnOrder: newColumnOrder,
      };

      dbRefference.set(newState);
      this.setState(newState);
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      dbRefference.set(newState);
      this.setState(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    dbRefference.set(newState);
    this.setState(newState);
  };

  handleToggleAddTask = event => {
    const newIsAddTask = !this.state.isAddTask

    const el = event.target;
    const id = parseInt(el.id)
    const currentColumn = this.state.columns[`column-${id+1}`]
    const workingWith = [currentColumn, id]

    const newState = {
      ...this.state,
      isAddTask: newIsAddTask,
      workingWith: workingWith,
    }
    dbRefference.set(newState);
    this.setState(newState)
  }

  closeModal = () => {
    const newState = {
      ...this.state,
      isAddTask: !this.state.isAddTask,
    }
    dbRefference.set(newState);
    this.setState(newState)
  }

  handleAddTask = event => {
    event.preventDefault()

    const id = this.state.workingWith[1]
    const currentColumns = {...this.state.columns}
    const currentColumn = this.state.workingWith[0]
    const currentOrder = currentColumn.taskIds
    const currentTasks = {...this.state.tasks}
    const content = document.getElementById('task-name').value
    const newTask = {
      id: `task${Object.keys(currentTasks).length + 1}`,
      content: `${content}`
    }

    currentTasks[`task${Object.keys(currentTasks).length + 1}`] = newTask
    const newOrder = [...currentOrder, newTask.id]

    currentColumn.taskIds = newOrder;
    const newColumn = currentColumn;
    currentColumns[`column-${id+1}`] = newColumn;

    const newState = {
      ...this.state,
      columns: currentColumns,
      tasks: currentTasks,
      isAddTask: !this.state.isAddTask,
    }

    dbRefference.set(newState);

    this.setState(newState)
  }

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <Droppable droppableId='all-columns' direction="horizontal" type='column'>
          {provided => (
            <Container
              {...provided.droppableProps}
              innerRef={provided.innerRef}
              ref={provided.innerRef}
            >
              {this.state.columnOrder.map((columnId, index) => {
                const column = this.state.columns[columnId];
                const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

                return <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  index={index}
                  handleClickAddTask={this.handleToggleAddTask}
                />;
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
        {this.state.isAddTask ? <AddTaskModal closeModal={this.closeModal} handleAddTask={this.handleAddTask} /> : ''}
      </DragDropContext>
    );
  }
}


