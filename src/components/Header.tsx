import React, { useState, VFC } from "react";

const Header: VFC = () => {
  const [text, setText] = useState("");

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setText(e.target.value);

  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={text}
        onChange={handleChange}
      />
    </header>
  );
};

export default Header;
