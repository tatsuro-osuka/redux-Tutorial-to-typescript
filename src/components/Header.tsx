import React, { useState, VFC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveNewTodo, selectTodoIds } from "../features/todos/todoSlice";

const Header: VFC = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector(selectTodoIds);
  const newId = todos.slice(-1)[0];

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setText(e.target.value);

  const handleKeydown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const trimText = text.trim();
    if (e.which === 13 && trimText) {
      await dispatch(saveNewTodo(trimText, newId));
      setText("");
    }
  };

  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeydown}
      />
    </header>
  );
};

export default Header;
