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
      initialTime: 600,
      timerOn: false,
      isEditing: false,
    },
    {
      text: 'Editing task',
      done: false,
      id: 2,
      createdTime: new Date(),
      timer: 600,
      initialTime: 600,
      timerOn: false,
      isEditing: false,
    },
    {
      text: 'Active task',
      done: false,
      id: 3,
      createdTime: new Date(),
      timer: 600,
      initialTime: 600,
      timerOn: false,
      isEditing: false,
    },
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTodoData((prevData) =>
        prevData.map((item) => {
          if (item.timerOn && item.timer > 0) {
            return {
              ...item,
              timer: item.timer - 1,
            };
          } else if (item.timer === 0 && item.timerOn) {
            return {
              ...item,
              timerOn: false,
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
    initialTime: timer,
    timerOn: false,
    isEditing: false,
  });

  const deleteItem = (id) => {
    setTodoData((prevData) => prevData.filter((el) => el.id !== id));
  };

  const addItem = (text, timer) => {
    setTodoData((prevData) => [...prevData, createTodoItem(text, timer)]);
  };

  const onToggleDone = (id) => {
    setTodoData((prevData) => prevData.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  const deleteDoneTask = () => {
    setTodoData((prevData) => prevData.filter((el) => !el.done));
  };

  const toggleTimer = (id) => {
    setTodoData((prevData) => {
      const newData = [...prevData];
      const idx = newData.findIndex((el) => el.id === id);
      if (newData[idx].timer === 0) {
        newData[idx] = { ...newData[idx], timer: newData[idx].initialTime, timerOn: true };
      } else {
        newData[idx] = { ...newData[idx], timerOn: !newData[idx].timerOn };
      }

      return newData;
    });
  };

  const resetTimer = (id) => {
    setTodoData((prevData) => {
      const newData = [...prevData];
      const idx = newData.findIndex((el) => el.id === id);
      newData[idx] = { ...newData[idx], timer: newData[idx].initialTime, timerOn: false };
      return newData;
    });
  };

  const toggleEditing = (id) => {
    setTodoData((prevData) => {
      const newData = [...prevData];
      const idx = newData.findIndex((el) => el.id === id);
      newData[idx] = { ...newData[idx], isEditing: !newData[idx].isEditing };
      return newData;
    });
  };

  const updateTaskText = (id, newText) => {
    setTodoData((prevData) => {
      const newData = [...prevData];
      const idx = newData.findIndex((el) => el.id === id);
      newData[idx] = { ...newData[idx], text: newText }; // Обновляем текст задачи
      return newData;
    });
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

  const filteredData = filterData(todoData, filter);

  return (
    <section className="todoapp">
      <NewTaskForm onItemAdded={addItem} />
      <Tasks
        todos={filteredData}
        onDeleted={deleteItem}
        onToggleDone={onToggleDone}
        onToggleTimer={toggleTimer}
        onResetTimer={resetTimer}
        onToggleEditing={toggleEditing}
        onUpdateText={updateTaskText}
      />
      <Footer data={filteredData} setFilter={setFilter} deleteDone={deleteDoneTask} />
    </section>
  );
}

root.render(<App />);
