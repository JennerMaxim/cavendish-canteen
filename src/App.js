import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./TodoList";
import "./App.css";
import Header from "./Header";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  // const [time, setTime] = useState();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);

    // Added
    // const storedTodoName = localStorage.getItem("todoApp.todoName");
    // if (storedTodoName) todoNameRef.current.value = storedTodoName;
    // Up here
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;

    // Time
    // const now = new Date();
    // const currentTime = ["Date: ", now.toLocaleDateString(), ", Time: ", now.toLocaleTimeString()];
    // setTime(currentTime);

    // Added
    // localStorage.setItem("todoApp.todoName", name);
    // Up here
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

 const handleKeypress = e => {
  if (e.keyCode === 13){
    handleAddTodo();
  }
 }

  return (
    <>
      <Header />
      <div className="app">
        <TodoList todos={todos} toggleTodo={toggleTodo} />
        {/* <p>{time}</p> */}
        <div className="down">
          <input className="input" onKeyDown={handleKeypress} onke ref={todoNameRef} type="text" />
          <br></br>
          <div className="buttons">
            <button className="add" onClick={handleAddTodo}>
              Add Todo
            </button>
            <button className="clear" onClick={handleClearTodos}>
              Clear Completed
            </button>
          </div>
          <div className="remain">
            {todos.filter((todo) => !todo.complete).length} left
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
