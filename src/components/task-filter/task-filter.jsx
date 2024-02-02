import React from 'react';

import './task-filter.css';

function TaskFilter({ setFilter }) {
  return (
    <ul className="filters">
      <li>
        <button type="button" onClick={() => setFilter('all')}>
          All
        </button>
      </li>
      <li>
        <button type="button" onClick={() => setFilter('active')}>
          Active
        </button>
      </li>
      <li>
        <button type="button" onClick={() => setFilter('completed')}>
          Completed
        </button>
      </li>
    </ul>
  );
}

export default TaskFilter;
