import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { firebaseDatabase } from './backend/config/firebaseConfig';
import AddTaskModal from './components/AddTaskModal';
import Column from './components/Column';
import { Container } from './styles/GlobalStyles'
import AddColumnBtn from './components/AddColumnBtn';
import AddColumnInput from './components/AddColumnInput';


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
    isAddColumn: false,
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
    const id = el.id;
    const workingWith = [id]

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
      workingWith: null,
    }
    dbRefference.set(newState);
    this.setState(newState)
  }

  handleAddTask = event => {
    event.preventDefault()

    const currentColumnId = [...this.state.workingWith]
    const currentColumns = {...this.state.columns}
    const currentColumn = currentColumns[currentColumnId]
    const currentTasks = {...this.state.tasks}
    const content = document.getElementById('task-name').value
    const newTask = {
      id: `task${Object.keys(currentTasks).length + 1}`,
      content: `${content}`
    }

    console.log(currentColumn)

    currentTasks[`task${Object.keys(currentTasks).length + 1}`] = newTask
    currentColumn.taskIds.push(newTask.id)

    const newState = {
      ...this.state,
      columns: currentColumns,
      tasks: currentTasks,
      isAddTask: !this.state.isAddTask,
      workingWith: null,
    }

    dbRefference.set(newState);

    this.setState(newState)
  }


  handleToggleColumn = () => {
    const newState = {
      ...this.state,
      isAddColumn: !this.state.isAddColumn,
    }

    this.setState(newState)
  }

  handleCreateColumn = event => {
    event.preventDefault()
    const columnName = document.getElementById('column-name').value;
    if(!columnName){
      this.setState({
        isAddColumn: !this.state.isAddColumn,
      })
      return;
    };

    const newColumns = {...this.state.columns};
    const totalColumns = Object.keys(newColumns).length

    newColumns[`column-${totalColumns + 1}`] = {
      id: `column-${totalColumns + 1}`,
      title: columnName,
      taskIds: [],
    }

    const newColumnOrder = [...this.state.columnOrder, `column-${totalColumns + 1}`]

    const newState = {
      ...this.state,
      isAddColumn: !this.state.isAddColumn,
      columns: newColumns,
      columnOrder: newColumnOrder,
    }

    dbRefference.set(newState)
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
              {
                !this.state.isAddColumn ?
                <AddColumnBtn handleClick={this.handleToggleColumn} />
                : <AddColumnInput handleSubmit={this.handleCreateColumn}/>
              }
            </Container>
          )}
        </Droppable>
        {
          this.state.isAddTask ?
          <AddTaskModal closeModal={this.closeModal} handleAddTask={this.handleAddTask} /> : null
        }
      </DragDropContext>
    );
  }
}


