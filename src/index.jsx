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
      timer: 600, // default 10 minutes in seconds
    },
    {
      text: 'Editing task',
      done: false,
      id: 2,
      createdTime: new Date(),
      timer: 600, // default 10 minutes in seconds
    },
    {
      text: 'Active task',
      done: false,
      id: 3,
      createdTime: new Date(),
      timer: 600, // default 10 minutes in seconds
    },
  ]);

  const createTodoItem = (text, timer) => ({
    text,
    done: false,
    id: Math.random().toString(36).slice(2),
    createdTime: new Date(),
    timer,
  });

  const addItem = (text, timer) => {
    setTodoData((prevData) => [...prevData, createTodoItem(text, timer)]);
  };

  const deleteItem = (id) => {
    setTodoData((prevData) => prevData.filter((el) => el.id !== id));
  };

  const toggleDone = (id) => {
    setTodoData((prevData) => prevData.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  const deleteDoneTask = () => {
    setTodoData((prevData) => prevData.filter((el) => !el.done));
  };

  const filterData = (data, currentFilter) => {
    switch (currentFilter) {
      case 'active':
        return data.filter((el) => !el.done);
      case 'completed':
        return data.filter((el) => el.done);
      default:
        return data;
    }
  };

  const [filter, setFilter] = useState('all');
  const filteredData = filterData(todoData, filter);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTodoData((prevData) =>
        prevData.map((item) => ({
          ...item,
          timer: item.timer > 0 ? item.timer - 1 : 0,
        }))
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <React.StrictMode>
      <section className="todoapp">
        <NewTaskForm onItemAdded={addItem} />
        <section className="main">
          <Tasks todos={filteredData} onDeleted={deleteItem} onToggleDone={toggleDone} />
          <Footer data={filteredData} setFilter={setFilter} deleteDone={deleteDoneTask} />
        </section>
      </section>
    </React.StrictMode>
  );
}

export default App;
root.render(<App />);
