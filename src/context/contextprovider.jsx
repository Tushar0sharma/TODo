import { useState,useEffect } from "react";
import { TodoContext } from "./contextapi";
export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
  
    useEffect(() => {
      const savedTodos = JSON.parse(localStorage.getItem('todos'));
      if (savedTodos) {
        setTodos(savedTodos);
      }
    }, []);
  
    useEffect(() => {
      if (todos.length > 0) {
        localStorage.setItem('todos', JSON.stringify(todos));
      }
    }, [todos]);
  
    const addTodo = (text) => {
      const newTodo = {
        id: Date.now(),
        text,
        completed: false,
      };
      setTodos([newTodo,...todos]);
    };
  
    const editTodo = (id, newText) => {
      const updatedTodos = todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      );
      setTodos(updatedTodos);
    };
  
    const deleteTodo = (id) => {
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
    };
  
    const toggleComplete = (id) => {
      const updatedTodos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
    };
  
    return (
      <TodoContext.Provider
        value={{
          todos,
          addTodo,
          editTodo,
          deleteTodo,
          toggleComplete,
        }}
      >
        {children}
      </TodoContext.Provider>
    );
  };