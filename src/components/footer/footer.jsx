import React from 'react';

import TaskFilter from '../task-filter';

import './footer.css';

function Footer({
  data = [],
  setFilter = () => {
    console.log('Функция не передана');
  },
  deleteDone = () => {
    console.log('Функция не передана');
  },
}) {
  const doneCounter = data.filter((el) => !el.done).length;

  return (
    <footer className="footer">
      <span className="todo-count">{doneCounter} items left</span>
      <TaskFilter setFilter={setFilter} />
      <button className="clear-completed" onClick={deleteDone} type="button">
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
