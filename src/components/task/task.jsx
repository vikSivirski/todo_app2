import React from 'react';
import PropTypes from 'prop-types';

import './task.css';

function TodoItem({ text, onDeleted, onToggleDone, done, createdTime }) {
  const classNames = done ? 'completed' : 'active';

  return (
    <li className={classNames}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleDone} />
        <label>
          <span className="description">{text}</span>
          <span className="created">
            created
            {createdTime}
          </span>
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
};

export default TodoItem;
