import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './task.css';

function TodoItem({ text, onDeleted, onToggleDone, done, createdTime, timer }) {
  const [elapsedTime, setElapsedTime] = useState(timer); // Используем значение таймера из props
  const [timerOn, setTimerOn] = useState(false);
  let timerInterval;

  useEffect(() => {
    if (timerOn && elapsedTime > 0) {
      timerInterval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [timerOn, elapsedTime]);

  const toggleTimer = () => {
    setTimerOn((prev) => !prev);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <li className={done ? 'completed' : 'active'}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleDone} />
        <label>
          <span className="description">{text}</span>
          <span className="created">created {createdTime}</span>
        </label>
        <button className="icon icon-edit" />
        <button className="icon icon-destroy" onClick={onDeleted} />
        <button className={`icon ${timerOn ? 'icon-pause' : 'icon-play'}`} onClick={toggleTimer} />
        <span className="description">{formatTime(elapsedTime)}</span>
      </div>
      <input
        type="text"
        className="edit"
        value="Editing task"
        onChange={() => {
          console.log('was changed');
        }}
      />
    </li>
  );
}

TodoItem.propTypes = {
  text: PropTypes.string.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  done: PropTypes.bool,
  createdTime: PropTypes.string,
  timer: PropTypes.number.isRequired, // Добавлен пропс для таймера
};

export default TodoItem;
