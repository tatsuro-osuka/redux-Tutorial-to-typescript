import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../types/types";
import { availableColors, capitalize } from "../filters/colors";
import {
  selectTodoById,
  todoColorSelected,
  todoDeleted,
  todoToggled,
} from "./todoSlice";

const TodoListItem = ({ id }: { id: number }) => {
  // Call our `selectTodoById` with the state _and_ the ID value
  const todo = useSelector((state: StateType) => selectTodoById(state, id));
  const { title, completed, color } = todo;

  const dispatch = useDispatch();

  const handleCompletedChanged = () => {
    dispatch(todoToggled(todo.id));
  };

  const handleColorChanged = (e: { target: { value: string } }) => {
    const color = e.target.value;
    dispatch(todoColorSelected(todo.id, color));
  };

  const onDelete = () => {
    dispatch(todoDeleted(todo.id));
  };

  const colorOptions = availableColors.map((c) => (
    <option key={c} value={c}>
      {capitalize(c)}
    </option>
  ));

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChanged}
          />
          <div className="todo-text">{title}</div>
        </div>
        <div className="segment buttons">
          <select
            className="colorPicker"
            value={color}
            style={{ color }}
            onChange={handleColorChanged}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button className="destroy" onClick={onDelete}>
            X
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoListItem;
