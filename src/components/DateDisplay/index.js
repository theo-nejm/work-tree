import React from 'react';

import { Container } from './styled';
import { AiOutlineClockCircle } from 'react-icons/ai';

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

  return (
    <Container color={color} bgColor={bgColor}>
      <input
        type="checkbox"
        id={`check-${props.taskId}`}
        onChange={props.checkTask}
        checked={props.isChecked ? true : false}
      />
      <AiOutlineClockCircle />
      {props.date}
    </Container>
  )
}
