import React, { useState } from 'react';

import './new-task-form.css';

function NewTaskForm({ onItemAdded }) {
  const [label, setLabel] = useState('');

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onItemAdded(label);
    setLabel('');
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input className="new-todo" placeholder="What needs to be done?" onChange={onLabelChange} value={label} />
      </form>
    </header>
  );
}

export default NewTaskForm;
