import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TodoList from "./features/todos/TodoList";

function App() {
  return (
    <div className="App">
      <nav>
        <section>
          <h1>Redux Tutorial</h1>
        </section>
      </nav>
      <main>
        <section className="medium-container">
          <h2>Todos</h2>
          <div className="todoapp">
            <Header />
            <TodoList />
            <Footer />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
