import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import TodoItem from '../task';

import './task-list.css';

function Tasks({
  todos = [],
  onDeleted = () => {
    console.log('Функция не передана');
  },
  onToggleDone = () => {
    console.log('Функция не передана');
  },
}) {
  const items = todos.map((item) => {
    const distanceToNow = formatDistanceToNow(item.createdTime, {
      addSuffix: true,
      includeSeconds: true,
    });
    return (
      <TodoItem
        key={item.id}
        text={item.text}
        onDeleted={() => onDeleted(item.id)}
        onToggleDone={() => onToggleDone(item.id)}
        done={item.done}
        createdTime={distanceToNow}
      />
    );
  });

  return <ul className="todo-list">{items}</ul>;
}

export default Tasks;
