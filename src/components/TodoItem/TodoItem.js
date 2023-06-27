import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import ClearIcon from '@mui/icons-material/Clear';
import TextField from "@mui/material/TextField";

const TodoItem = ({
  todo,
  handleCheckboxChange,
  handleDeleteTodo,
  handleEditTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false); // State to track if the todo item is being edited
  const [updatedTitle, setUpdatedTitle] = useState(todo.title); // State to store the updated title of the todo item

  const handleCheckboxClick = () => {
    handleCheckboxChange(todo.id); // Call the parent function to handle checkbox click
  };
  const handleInputChange = (e) => {
    setUpdatedTitle(e.target.value); // Update the updated title state as the input value changes
  };
  const handleInputBlur = () => {
    setIsEditing(false); // Disable editing mode
    handleEditTodo(todo.id, updatedTitle); // Call the parent function to handle todo item edit
  };
  const handleDeleteClick = () => {
    handleDeleteTodo(todo.id, updatedTitle); // Call the parent function to handle todo item deletion
  };

  const handleDoubleClick = () => {
    setIsEditing(true); // Enable editing mode on double-click
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "8px",
        backgroundColor: todo.completed ? "#eaf7ea" : "#fff",
        padding: "8px",
        borderRadius: "4px",
      }}
    >
      <Checkbox
        checked={todo.completed}
        onChange={handleCheckboxClick}
        icon={<RadioButtonUncheckedOutlinedIcon />} // Icon to display when the checkbox is unchecked
        checkedIcon={<CheckCircleOutlineIcon style={{ color: "green" }} />} // Icon to display when the checkbox is checked
      />
      {isEditing ? (
        <TextField
          fullWidth
          value={updatedTitle}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          autoFocus
          InputProps={{
            style: { border: "1px solid lightgray" },
          }}
        />
      ) : (
        <div onDoubleClick={handleDoubleClick} style={{ flexGrow: 1 }}>
          {todo.title}
        </div>
      )}
      <IconButton aria-label="delete" onClick={handleDeleteClick}>
        <ClearIcon style={{ color: "red" }} />
      </IconButton>
    </div>
  );
};

export default TodoItem;
