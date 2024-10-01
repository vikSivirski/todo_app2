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
  onToggleTimer = () => {
    console.log('Функция не передана');
  },
  onResetTimer = () => {
    console.log('Функция не передана');
  },
  onToggleEditing = () => {
    console.log('Функция не передана');
  },
  onUpdateText = () => {
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
        timer={item.timer}
        timerOn={item.timerOn}
        onToggleTimer={() => onToggleTimer(item.id)}
        onResetTimer={() => onResetTimer(item.id)}
        isEditing={item.isEditing}
        onToggleEditing={() => onToggleEditing(item.id)}
        onUpdateText={(newText) => onUpdateText(item.id, newText)}
        initialTime={item.initialTime}
      />
    );
  });

  return <ul className="todo-list">{items}</ul>;
}

export default Tasks;
