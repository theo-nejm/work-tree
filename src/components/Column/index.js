import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';

import { firebaseDatabase } from '../../backend/config/firebaseConfig';

import { FaTrashAlt } from 'react-icons/fa'
import { RiCloseFill } from 'react-icons/ri';
import { Container, TaskList, Title, RemoveModal } from './styled'
import Task from '../Task';
import AddTaskButton from '../AddTaskButton';
import EditColumnInput from '../EditColumnInput'
import EditTaskModal from '../EditTaskModal';

const dbRefference = firebaseDatabase.ref(`state`)

export default class Column extends React.Component {
  state = {
    idEditTitle: false,
    currentTitle: '',
    isAskRemove: false,
    isEditTask: false,
    workingWith: '',
    currentDate: new Date(),
  }

  componentDidMount = async () => {
    const dbSnapshot = (await dbRefference.get(`state`)).val()
    this.setState({
      ...this.state,
      currentTitle: dbSnapshot.columns[this.props.column.id].title,
    })
  }

  handleToggleEdit = () => {
    const newState = {
      ...this.state,
      isEditTitle: !this.state.isEditTitle
    }

    this.setState(newState)
  }

  removeSelf = async () => {
    const dbSnapshot = (await dbRefference.get(`state`)).val()

    // console.log(Object.keys(dbSnapshot.columns))
    if(Object.keys(dbSnapshot.columns).length <= 1) {
      toast.error('Você precisa ter pelo menos uma coluna na sua Work Tree.')
      this.setState({
        ...this.state,
        isAskRemove: false,
      })

      return;
    }

    dbSnapshot.columnOrder.splice(dbSnapshot.columnOrder.indexOf(this.props.column.id), 1)

    const tasksToDelete = dbSnapshot.columns[this.props.column.id].taskIds ? dbSnapshot.columns[this.props.column.id].taskIds : null

    if(dbSnapshot.tasks && tasksToDelete) {
      for(let task of tasksToDelete) {
        dbSnapshot.tasks[task] = null;
      }
    }

    Object.keys(dbSnapshot.columns).forEach(column => {
      if(column === dbSnapshot.columns[this.props.column.id].id) {
        dbSnapshot.columns[column] = null;
        delete dbSnapshot.columns[column];
      }
    })
    dbRefference.set(dbSnapshot);
  }

  handleEditTitle = async event => {
    event.preventDefault()
    const newTitle = document.querySelector(`.${this.props.column.id}`).value;
    if(!newTitle) {
      this.setState({
        isEditTitle: !this.state.isEditTitle,
        isAskRemove: true,
      })
      return;
    }

    const newState = {
      isEditTitle: !this.state.isEditTitle,
      currentTitle: newTitle,
    }

    const dbSnapshot = (await dbRefference.get(`state`)).val()
    dbSnapshot.columns[this.props.column.id].title = newTitle;
    const newData = dbSnapshot;

    dbRefference.set(newData)
    this.setState(newState)
  }

  handleOpenModal = event => {
    let newState = {
      ...this.state,
      isEditTask: !this.state.isEditTask,
    }
    const tasks = this.props.tasks
    tasks.forEach(task => {
      if(task.id === event.target.id) {
        newState.workingWith = tasks[tasks.indexOf(task)]
      }
    })

    this.setState(newState)
  }

  handleCloseModal = () => {
    this.setState({
      ...this.state,
      isEditTask: false,
    })
  }

  handleEditTask = async event => {
    event.preventDefault()

    const dbSnapshot = (await dbRefference.get(`state`)).val()
    const currentTask = dbSnapshot.tasks[this.state.workingWith.id]

    const newContent = document.getElementById(`edit-${this.state.workingWith.id}`).value
    const newDate = document.getElementById(`edit-${this.state.workingWith.id}-date`).value

    if(!newContent) {
      toast.error('Não é possível retirar o nome do card.')
      this.setState({
        ...this.state,
        isEditTask: false,
      })

      return;
    }

    currentTask.content = newContent ? newContent : null;
    currentTask.date = newDate ? newDate : null;

    this.setState({
      ...this.state,
      isEditTask: false,
    })
    dbRefference.set(dbSnapshot)
  }

  handleDeleteTask = async event => {
    const dbSnapshot = (await dbRefference.get(`state`)).val()
    const id = event.target.id.replace('delete-', '')
    const column = this.props.column.id
    delete dbSnapshot.tasks[id]
    dbSnapshot.columns[column].taskIds.splice(dbSnapshot.columns[column].taskIds.indexOf(id), 1)

    this.setState({
      isEditTask: false,
    })
    dbRefference.set(dbSnapshot)
  }

  render() {
  return (
    <>
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
            {this.props.column.title}
            </Title> :
            <EditColumnInput
              handleBlur={this.handleToggleEdit}
              handleSubmit={this.handleEditTitle}
              classValue={this.props.column.id}
              colName={this.props.column.title}
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
                  <Task
                    key={task.id}
                    task={task}
                    index={index}
                    handleClick={this.handleOpenModal}
                    currentDate={this.state.currentDate.toLocaleDateString()}
                    checkTask={this.handleCompleteTask}
                  />
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
    {
      this.state.isAskRemove
      ? <RemoveModal>
        <div className="modal-wrapper">
          <div className="text">
            <h3>Você tem certeza?</h3>
            <p>
              Confirmar irá excluir a coluna e os {this.props.tasks.length} cards que estão nela!
            </p>
          </div>
          <div className="actions">
            <button
              onClick={() => this.setState({ ...this.state, isAskRemove: !this.state.isAskRemove })}
            >
              <RiCloseFill />
              Cancelar
            </button>
            <button
              onClick={this.removeSelf}
            >
              <FaTrashAlt />
              Confirmar
            </button>
          </div>

        </div>
      </RemoveModal>
      : null
    }
        {
          this.state.isEditTask
          ?
          <EditTaskModal
            closeModal={this.handleCloseModal}
            workingWith={this.state.workingWith}
            handleSubmit={this.handleEditTask}
            handleDelete={this.handleDeleteTask}
          />
          : null
        }
    </>
  );
  }
}

