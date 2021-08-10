import React, { VFC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { availableColors, capitalize } from "../features/filters/colors";
import {
  colorFilterChanged,
  statusFilterChanged,
  statusFilters,
} from "../features/filters/filterSlice";
import {
  allTodosCompleted,
  completedTodosCleared,
  selectTodos,
} from "../features/todos/todoSlice";

const RemainingTodos = ({ count }: { count: number }) => {
  const suffix = count === 1 ? "" : "s";

  return (
    <div className="todo-count">
      <h5>Remaining Todos</h5>
      <strong>{count}</strong> item{suffix} left
    </div>
  );
};

interface StatusFilterType {
  value: string;
  onChange: Function;
}

const StatusFilter = ({ value: status, onChange }: StatusFilterType) => {
  const renderedFilters = Object.keys(statusFilters).map((key) => {
    const value = statusFilters[key];
    const handleClick = () => onChange(value);
    const className = value === status ? "selected" : "";

    return (
      <li key={value}>
        <button className={className} onClick={handleClick}>
          {key}
        </button>
      </li>
    );
  });

  return (
    <div className="filters statusFilters">
      <h5>Filter by Status</h5>
      <ul>{renderedFilters}</ul>
    </div>
  );
};

interface ColorFilterType {
  colors: string[];
  onChange: Function;
}

const ColorFilters = ({ colors, onChange }: ColorFilterType) => {
  const renderedColors = availableColors.map((color) => {
    const checked = colors.includes(color);
    const handleChange = () => {
      const changeType = checked ? "removed" : "added";
      onChange(color, changeType);
    };

    return (
      <label key={color}>
        <input
          type="checkbox"
          name={color}
          checked={checked}
          onChange={handleChange}
        />
        <span
          className="color-block"
          style={{
            backgroundColor: color,
          }}
        ></span>
        {capitalize(color)}
      </label>
    );
  });

  return (
    <div className="filters colorFilters">
      <h5>Filter by Color</h5>
      <form className="colorSelection">{renderedColors}</form>
    </div>
  );
};

const Footer: VFC = () => {
  const dispatch = useDispatch();

  const todosRemaining = useSelector((state: any) => {
    const unCompletedTodos = selectTodos(state).filter(
      (todo) => !todo.completed
    );
    return unCompletedTodos.length;
  });

  const { status, colors } = useSelector((state: any) => state.filters);

  const onCheckCompletedClicked = () => dispatch(allTodosCompleted(null));
  const onClearCompletedClicked = () => dispatch(completedTodosCleared(null));

  const onColorChange = (color: string, changeType: "added" | "removed") => {
    dispatch(colorFilterChanged(color, changeType));
  };

  const onStatusChange = (status: {
    color: string;
    changeType: "added" | "removed";
  }) => {
    dispatch(statusFilterChanged(status));
  };

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button" onClick={onCheckCompletedClicked}>
          Mark All Completed
        </button>
        <button className="button" onClick={onClearCompletedClicked}>
          Clear Completed
        </button>
      </div>

      <RemainingTodos count={todosRemaining} />
      <StatusFilter value={status} onChange={onStatusChange} />
      <ColorFilters colors={colors} onChange={onColorChange} />
    </footer>
  );
};

export default Footer;
