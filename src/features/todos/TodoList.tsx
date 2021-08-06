import React from "react";
import { TodoType } from "../../types/types";
import TodoListItem from "./TodoListItem";

const TodoList = () => {
  const todos: TodoType[] = [];

  const renderedListItems = todos.map((todo) => {
    return <TodoListItem key={todo.id} todo={todo} />;
  });

  return <ul className="todo-list">{renderedListItems}</ul>;
};

export default TodoList;
