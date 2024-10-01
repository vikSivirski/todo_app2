import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './task.css';

function TodoItem({
  text,
  onDeleted,
  onToggleDone,
  done,
  createdTime,
  timer,
  initialTime,
  timerOn,
  onToggleTimer,
  onResetTimer,
  isEditing,
  onToggleEditing,
  onUpdateText,
}) {
  const [elapsedTime, setElapsedTime] = useState(timer);
  const [currentText, setCurrentText] = useState(text);

  useEffect(() => {
    setElapsedTime(timer);
  }, [timer]);

  useEffect(() => {
    let timerInterval;

    if (timerOn && elapsedTime > 0) {
      timerInterval = setInterval(() => {
        setElapsedTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerInterval);
            onResetTimer(); // Сбрасываем таймер до исходного значения
            return initialTime; // Сброс таймера до начального времени
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [timerOn, elapsedTime, onResetTimer]);

  const toggleTimer = (e) => {
    e.stopPropagation();
    onToggleTimer();
  };

  const toggleTaskDone = (e) => {
    e.stopPropagation();
    onToggleDone();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateText(currentText);
    onToggleEditing();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <li className={`${done ? 'completed' : 'active'} ${isEditing ? 'editing' : ''}`}>
      <div className="view">
        <label onClick={toggleTaskDone}>
          <span className="description">{text}</span>
          <div className="flex timer-block">
            <button className={`icon ${timerOn ? 'icon-pause' : 'icon-play'}`} onClick={toggleTimer} />
            <span className="timer">{formatTime(elapsedTime)}</span>
          </div>
          <span className="created">created {createdTime}</span>
        </label>
        <button className="icon icon-edit" onClick={onToggleEditing} />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="edit"
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
          autoFocus
        />
      </form>
    </li>
  );
}

TodoItem.propTypes = {
  text: PropTypes.string.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  initialTime: PropTypes.number.isRequired,
  done: PropTypes.bool,
  createdTime: PropTypes.string,
  timer: PropTypes.number.isRequired,
};

export default TodoItem;
