import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { firebaseDatabase } from './backend/config/firebaseConfig';

import { Container } from './styles/GlobalStyles'
import Header from './components/Header';
import AddTaskModal from './components/AddTaskModal';
import Column from './components/Column';
import AddColumnBtn from './components/AddColumnBtn';
import AddColumnInput from './components/AddColumnInput';

const dbRefference = firebaseDatabase.ref(`state`)

export default class App extends React.Component {
  state = {
    tasks: {},
    columns: {},
    columnOrder: [],
    isAddTask: false,
    workingWith: null,
    isAddColumn: false,
    nOfCols: 0,
  };

  componentDidMount = () => {
    try {
      dbRefference.on('value', async (snapshot) => {
      const data = await snapshot.val();
      const columns = data.columns;

      if(columns) {
        const columnsArr = Object.keys(columns) ? Object.keys(columns) : null

        for(let column of columnsArr) {
          const taskIds = !columns[column].taskIds ? [] : columns[column].taskIds
          columns[column].taskIds = taskIds
        }
      }

      this.setState(data)
    });
    } catch(e) {
      console.log(e)
    }
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

    this.setState(newState)
  }

  closeModal = () => {
    const newState = {
      ...this.state,
      isAddTask: !this.state.isAddTask,
      workingWith: null,
    }

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
    const currentTotalColumns = this.state.nOfCols
    const newTotalColumns = currentTotalColumns + 1

    newColumns[`column-${currentTotalColumns + 1}`] = {
      id: `column-${currentTotalColumns + 1}`,
      title: columnName,
      taskIds: [],
    }

    const newColumnOrder = [...this.state.columnOrder, `column-${currentTotalColumns + 1}`]

    const newState = {
      ...this.state,
      isAddColumn: !this.state.isAddColumn,
      columns: newColumns,
      columnOrder: newColumnOrder,
      nOfCols: newTotalColumns,
    }

    dbRefference.set(newState)
  }

  render() {
    return (
      <>
      <ToastContainer autoClose={5000} className="toast-container" />
      <Header />
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
                  isEdit={this.state.isEditColumn}
                />;
              })}
              {provided.placeholder}
              {
                !this.state.isAddColumn
                ? <AddColumnBtn handleClick={this.handleToggleColumn} />
                : <AddColumnInput
                    handleSubmit={this.handleCreateColumn}
                    handleBlur={this.handleToggleColumn}
                  />
              }
            </Container>
          )}
        </Droppable>
        {
          this.state.isAddTask ?
          <AddTaskModal closeModal={this.closeModal} handleAddTask={this.handleAddTask} /> : null
        }
      </DragDropContext>
      </>
    );
  }
}
