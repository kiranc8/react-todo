import React, { useState, useEffect } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import styles from "../styles/Todo.module.css";
import TodoItem from "../TodoItem/TodoItem";

const Todo = () => {
  const [todos, setTodos] = useState([]); // State to store the todos
  const [newTodo, setNewTodo] = useState(""); // State to track the value of the new todo input field
  const [pendingTasks, setPendingTasks] = useState(0); // State to track the number of pending tasks

  useEffect(() => {
    // Fetch initial todos from an API endpoint (using jsonplaceholder as an example)
    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      setTodos(res.data); // Set the fetched todos in state
      setPendingTasks(res.data.filter((todo) => !todo.completed).length); // Calculate the number of pending tasks
    });
  }, []);

  const handleInputChange = (e) => {
    // Handler for new todo input field change
    setNewTodo(e.target.value); // Update the new todo value
  };

  const handleAddTodo = () => {
    // Handler for adding a new todo
    const newTodoItem = {
      id: todos.length + 1,
      title: newTodo,
      completed: false,
    };
    axios
      .post("https://jsonplaceholder.typicode.com/todos", newTodoItem)
      .then((res) => {
        const addedTodo = res.data;
        setTodos([...todos, addedTodo]); // Add the new todo to the todos state
        setNewTodo(""); // Clear the new todo input field
        setPendingTasks(pendingTasks + 1); // Increment the number of pending tasks
      })
      .catch((error) => console.log(error));
  };

  const handleCheckboxChange = (todoId) => {
    // Handler for checkbox toggle
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        const updatedTodo = { ...todo, completed: !todo.completed }; // Toggle the completed status
        axios
          .put(
            `https://jsonplaceholder.typicode.com/todos/${todoId}`,
            updatedTodo
          )
          .then(() => {
            setTodos((prevTodos) =>
              prevTodos.map((prevTodo) =>
                prevTodo.id === todoId ? updatedTodo : prevTodo
              )
            );
          })
          .catch((error) => console.log(error));
      }
      return todo;
    });
    setTodos(updatedTodos); // Update the todos state with the updated list
    setPendingTasks(updatedTodos.filter((todo) => !todo.completed).length); // Update the number of pending tasks
  };

  const handleEditTodo = (todoId, updatedTitle) => {
    // Handler for editing a todo
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        const updatedTodo = { ...todo, title: updatedTitle };
        axios
          .put(
            `https://jsonplaceholder.typicode.com/todos/${todoId}`,
            updatedTodo
          )
          .then(() => {
            setTodos((prevTodos) =>
              prevTodos.map((prevTodo) =>
                prevTodo.id === todoId ? updatedTodo : prevTodo
              )
            );
          })
          .catch((error) => console.log(error));
        // return updatedTodo;
      }
      return todo;
    });
    setTodos(updatedTodos); // Update the todos state
  };

  const handleDeleteTodo = (todoId) => {
    // Handler for deleting a todo
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
      .then(() => {
        const updatedTodos = todos.filter((todo) => todo.id !== todoId); // Remove the deleted todo from the todos state
        setTodos(updatedTodos); // Update the todos state
        setPendingTasks(updatedTodos.filter((todo) => !todo.completed).length); // Update the number of pending tasks
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.container}>
      <Typography variant="h4" component="h2" gutterBottom>
        My Todo List
      </Typography>
      <Paper elevation={3} className={styles.paper}>
        <Box className={styles.formContainer}>
          <Paper component="form" className={styles.inputContainer}>
            <InputBase
              className={styles.todoInput}
              placeholder="Write your Todos here..."
              inputProps={{ "aria-label": "search google maps" }}
              value={newTodo}
              onChange={handleInputChange}
              fullWidth
            />
            <Divider className={styles.divider} orientation="vertical" />
            <IconButton
              className={styles.addButton}
              color="primary"
              aria-label="directions"
              onClick={handleAddTodo}
            >
              <AddIcon />
            </IconButton>
          </Paper>
        </Box>

        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleCheckboxChange={handleCheckboxChange}
            handleDeleteTodo={handleDeleteTodo}
            handleEditTodo={handleEditTodo}
          />
        ))}
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" component="p">
          {pendingTasks} item(s) left
        </Typography>
      </Paper>
    </div>
  );
};

export default Todo;
