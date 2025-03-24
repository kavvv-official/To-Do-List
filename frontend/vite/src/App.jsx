import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaTrash, FaCheckCircle } from 'react-icons/fa';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/todos').then((response) => setTodos(response.data));
  }, []);

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    axios.post('http://localhost:5000/api/todos', { title: newTodo }).then((response) => {
      setTodos([...todos, response.data]);
      setNewTodo('');
    });
  };

  const toggleComplete = (id) => {
    const todo = todos.find((t) => t._id === id);
    axios.put(`http://localhost:5000/api/todos/${id}`, { completed: !todo.completed }).then(() => {
      setTodos(
        todos.map((t) =>
          t._id === id ? { ...t, completed: !t.completed } : t
        )
      );
    });
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`).then(() => {
      setTodos(todos.filter((t) => t._id !== id));
    });
  };

  return (
    <div className="app">
      <div className="todo-card">
        <h1>My Tasks</h1>
        <div className="todo-input">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
          />
          <button onClick={addTodo}>
            <FaPlus />
          </button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo._id} className={todo.completed ? 'completed' : ''}>
              <span onClick={() => toggleComplete(todo._id)}>
                {todo.completed ? "✅ " : "📝 "}
                {todo.title}
              </span>
              <FaTrash className="icon" onClick={() => deleteTodo(todo._id)} color="red" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
