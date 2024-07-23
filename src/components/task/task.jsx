import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './task.css';

function TodoItem({ text, onDeleted, onToggleDone, done, createdTime, timer, timerOn, onToggleTimer, onResetTimer }) {
  const [elapsedTime, setElapsedTime] = useState(timer); // Устанавливаем таймер из пропсов

  useEffect(() => {
    setElapsedTime(timer); // Устанавливаем начальное значение таймера при изменении пропсов
  }, [timer]);

  useEffect(() => {
    let timerInterval;

    if (timerOn && elapsedTime > 0) {
      timerInterval = setInterval(() => {
        setElapsedTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerInterval);
            onResetTimer(); // Вызов функции сброса таймера
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [timerOn, elapsedTime, onResetTimer]);

  const toggleTimer = () => {
    onToggleTimer();
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
          <div className="flex timer-block">
            <button className={`icon ${timerOn ? 'icon-pause' : 'icon-play'}`} onClick={toggleTimer} />
            <span className="timer">{formatTime(timer)}</span>
          </div>
          <span className="created">created {createdTime}</span>
        </label>
        <button className="icon icon-edit" />
        <button className="icon icon-destroy" onClick={onDeleted} />
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
  timer: PropTypes.number.isRequired,
};

export default TodoItem;
