import { useState, useEffect } from 'react';

function TodoList() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { text: newTask, done: false }]);
    setNewTask('');
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <input value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="Новая задача" />
      <button onClick={addTask}>Добавить</button>
      <ul>
        {tasks.map((task, i) => (
          <li key={i} style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
            {task.text}
            <button onClick={() => toggleTask(i)}>✓</button>
            <button onClick={() => deleteTask(i)}>✗</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
