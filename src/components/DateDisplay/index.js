import React from 'react';

import { Container } from './styled';
import { AiOutlineClockCircle } from 'react-icons/ai';

import { firebaseDatabase } from '../../backend/config/firebaseConfig';

const dbRefference = firebaseDatabase.ref(`state`)

export default function DateDisplay(props) {
  function verifyDeadline() {
    const taskDeadlineArr = props.date.split('/'),
    currentDateArr = props.currentDate.split('/');
    if(Number(taskDeadlineArr[2]) > Number(currentDateArr[2])) {
      return true;
    } else if(Number(taskDeadlineArr[2]) < Number(currentDateArr[2])) {
      return false;
    } else if(Number(taskDeadlineArr[1]) > Number(currentDateArr[1])) {
      return true;
    } else if(Number(taskDeadlineArr[1]) < Number(currentDateArr[1])) {
      return false;
    } else if(Number(taskDeadlineArr[0]) > Number(currentDateArr[0])) {
      return true;
    } else if(Number(taskDeadlineArr[0]) < Number(currentDateArr[0])) {
      return false;
    }

    return true;
  }

  let bgColor, color;
  if(props.isChecked) {
    bgColor = '#4bb543';
    color = 'white';
  } else if(!verifyDeadline()) {
    bgColor = '#cf0524';
    color = 'white';
  } else {
    bgColor = 'none';
    color = 'inherit';
  }

  async function getDeadlined() {
    const dbSnapshot = (await dbRefference.get(`state`)).val()
    const deadlineds = document.querySelectorAll('.deadlined')
    const nOfDeadlineds = deadlineds.length

    dbSnapshot.nOfDeadlineds = nOfDeadlineds
    dbRefference.set(dbSnapshot)
  }

  const checklistClass = !verifyDeadline() && !props.isChecked ? 'deadlined' : 'undeadlined'

  return (
    <Container color={color} bgColor={bgColor} className={checklistClass}>
      <input
        type="checkbox"
        id={`check-${props.taskId}`}
        onChange={props.checkTask}
        onClick={getDeadlined}
        checked={props.isChecked ? true : false}
      />
      <AiOutlineClockCircle />
      {props.date}
    </Container>
  )
}
