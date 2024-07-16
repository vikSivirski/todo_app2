import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import NewTaskForm from './components/new-task-form';
import Tasks from './components/task-list';
import Footer from './components/footer';

import './index.css';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

function App() {
  const [todoData, setTodoData] = useState([
    {
      text: 'Completed task',
      done: false,
      id: 1,
      createdTime: new Date(),
      timer: 600,
    },
    {
      text: 'Editing task',
      done: false,
      id: 2,
      createdTime: new Date(),
      timer: 600,
    },
    {
      text: 'Active task',
      done: false,
      id: 3,
      createdTime: new Date(),
      timer: 600,
    },
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTodoData((prevData) =>
        prevData.map((item) => {
          if (item.timer > 0) {
            return {
              ...item,
              timer: item.timer - 1,
            };
          }
          return item;
        })
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const [filter, setFilter] = useState('all');

  const createTodoItem = (text, timer) => ({
    text,
    done: false,
    id: Math.random().toString(36).slice(2),
    createdTime: new Date(),
    timer,
  });

  const deleteItem = (id) => {
    setTodoData((prevData) => prevData.filter((el) => el.id !== id));
  };

  const addItem = (text, timer) => {
    setTodoData((prevData) => [...prevData, createTodoItem(text, timer)]);
  };

  const onToggleDone = (id) => {
    setTodoData((prevData) => {
      const newData = [...prevData];
      const idx = newData.findIndex((el) => el.id === id);
      newData[idx] = { ...newData[idx], done: !newData[idx].done };
      return newData;
    });
  };

  const filterItems = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'completed':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };

  const onFilterChange = (filter) => {
    setFilter(filter);
  };

  const visibleItems = filterItems(todoData, filter);

  return (
    <section className="todoapp">
      <NewTaskForm onItemAdded={addItem} />
      <Tasks todos={visibleItems} onDeleted={deleteItem} onToggleDone={onToggleDone} />
      <Footer toDo={todoData.length} filter={filter} onFilterChange={onFilterChange} />
    </section>
  );
}

root.render(<App />);
