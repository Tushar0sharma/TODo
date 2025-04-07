import React, { useState, useContext, useRef, useEffect } from 'react';
import { TodoContext } from '../context/contextapi.jsx';

const List = () => {
  const { todos, editTodo, deleteTodo, toggleComplete } = useContext(TodoContext);
  const [editedText, setEditedText] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);

  const handleEditClick = (todo) => {
    setEditingTodoId(todo.id);
    setEditedText(todo.text);
  };

  const handleSaveEdit = (id) => {
    if (editedText.trim()) {
      editTodo(id, editedText);
      setEditingTodoId(null);
      setEditedText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditedText('');
  };

  
  return (
    <div className="border-2 border-gray-200 p-4 rounded-xl w-full max-w-xl max-h-96 overflow-auto mt-4 bg-gray-50 shadow-lg">
      {todos.length === 0 ? (
        <div className="flex items-center justify-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm text-gray-700 text-center">
          <span className="text-lg">Add your first Todo!</span>
        </div>
      ) : (
        <ul className="w-full">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center justify-between border border-gray-300 rounded-lg pl-4 py-3 gap-4 mb-4 shadow-sm bg-white hover:bg-gray-100 duration-300 text-gray-700`}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="cursor-pointer mr-4"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />

                {editingTodoId === todo.id ? (
                  <div className="flex items-center gap-2 w-full">
                    <textarea
                      className="p-2 border sm:w-96 border-gray-300 rounded-lg outline-none w-32 "
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      rows="2"
                    />
                    <button
                      className="w-8 h-8 rounded-lg text-sm border border-blue-400 bg-blue-100 hover:bg-blue-200 text-blue-600"
                      onClick={() => handleSaveEdit(todo.id)}
                    >
                      📁
                    </button>
                    <button
                      className="w-8 h-8 rounded-lg text-sm border border-red-400 bg-red-100 hover:bg-red-200 text-red-600"
                      onClick={handleCancelEdit}
                    >
                      ❌
                    </button>
                  </div>
                ) : (
                  <span
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    wordBreak: 'break-word', 
                  }}
                    onClick={() => toggleComplete(todo.id)}
                    className="cursor-pointer w-full text-ellipsis overflow-hidden break-words"
                  >
                    {todo.text}
                  </span>
                )}
              </div>
              {editingTodoId !== todo.id && (
                <div className="flex space-x-2 mr-2">
                  <button
                    className={`w-10 h-8 rounded-lg text-sm border border-green-300 bg-green-50 ${todo.completed?"bg-red-200":""}  hover:bg-yellow-100 `}     onClick={() => handleEditClick(todo)}
                    disabled={todo.completed}
                  >
                    ✏️
                  </button>

                  <button
                    className="w-10 h-8 rounded-lg text-sm border border-red-300 bg-red-50 hover:bg-red-100 text-red-600"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    ❌
                  </button>
                </div>
              )}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default List;
