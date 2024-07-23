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

    if (label && minutes !== '' && seconds !== '') {
      const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
      onItemAdded(label, totalSeconds);
      setLabel('');
      setMinutes('');
      setSeconds('');
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input className="new-todo" placeholder="What needs to be done?" onChange={onLabelChange} value={label} />
        <input className="new-todo-form__timer" placeholder="Min" onChange={onMinutesChange} value={minutes} />
        <input className="new-todo-form__timer" placeholder="Sec" onChange={onSecondsChange} value={seconds} />
        <button type="submit"></button>
      </form>
    </header>
  );
}

export default NewTaskForm;
