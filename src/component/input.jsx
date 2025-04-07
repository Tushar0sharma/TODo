import React, { useState, useContext } from 'react';
import { TodoContext } from '../context/contextapi.jsx';

const Todo = () => {
  const [text, setText] = useState('');
  const { addTodo } = useContext(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <div className="flex flex-row items-center ">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
        className="w-80 p-3 border border-gray-300 rounded-lg shadow-sm "
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-3 ml-2  bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
      >
        Add Todo
      </button>
    </div>
  );
};

export default Todo;
