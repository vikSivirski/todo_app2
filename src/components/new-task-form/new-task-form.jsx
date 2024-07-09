import React, { useState } from 'react';

import './new-task-form.css';

function NewTaskForm({ onItemAdded }) {
  const [label, setLabel] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onMinutesChange = (e) => {
    setMinutes(e.target.value);
  };

  const onSecondsChange = (e) => {
    setSeconds(e.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const timeInMinutes = parseInt(minutes, 10) || 0;
    const timeInSeconds = parseInt(seconds, 10) || 0;
    const totalTime = timeInMinutes * 60 + timeInSeconds;
    if (label.trim() !== '' && totalTime > 0) {
      onItemAdded(label, totalTime);
      setLabel('');
      setMinutes('');
      setSeconds('');
    } else {
      alert('Please enter a task description and a valid time.');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input className="new-todo" placeholder="What needs to be done?" onChange={onLabelChange} value={label} />
        <input className="new-todo-form__timer" placeholder="Min" onChange={onMinutesChange} value={minutes} />
        <input className="new-todo-form__timer" placeholder="Sec" onChange={onSecondsChange} value={seconds} />
        <button type="submit" style={{ display: 'none' }}>
          Submit
        </button>
      </form>
    </header>
  );
}

export default NewTaskForm;
