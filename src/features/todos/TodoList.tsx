import React from "react";
import { useSelector } from "react-redux";
import TodoListItem from "./TodoListItem";
import { selectTodoIds } from "./todoSlice";

const TodoList = () => {
  const todos = useSelector(selectTodoIds);

  const renderedListItems = todos.map((todoId: React.Key) => {
    return <TodoListItem key={todoId} id={todoId} />;
  });

  return <ul className="todo-list">{renderedListItems}</ul>;
};

export default TodoList;
