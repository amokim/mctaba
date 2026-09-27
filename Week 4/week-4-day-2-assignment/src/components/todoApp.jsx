import { useState } from "react";

const FILTERS = {
  all: () => true,
  active: (todo) => !todo.completed,
  completed: (todo) => todo.completed,
};

const TodoApp = () => {
  // Lazy initializer reads localStorage once, synchronously, before first paint —
  // this is how the initial load happens without an effect.
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("todos");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  // Every mutation computes the next array and writes it to both state and
  // localStorage at the call site, so no useEffect is needed to keep them in sync.
  const persist = (nextTodos) => {
    setTodos(nextTodos);
    localStorage.setItem("todos", JSON.stringify(nextTodos));
  };

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    persist([...todos, { id: Date.now(), text, completed: false }]);
    setInput("");
  };

  const toggleTodo = (id) => {
    persist(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    persist(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    persist(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter(FILTERS[filter]);
  const remainingCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div style={{ maxWidth: "480px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Todo List</h1>

      <div style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="What needs doing?"
          style={{ flex: 1, padding: "10px 12px", fontSize: "16px", border: "2px solid #ddd", borderRadius: "8px" }}
        />
        <button
          onClick={addTodo}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", border: "2px solid #ddd", borderRadius: "8px" }}
        >
          Add
        </button>
      </div>

      <div style={{ display: "flex", gap: "8px", margin: "16px 0" }}>
        {["all", "active", "completed"].map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            style={{
              padding: "6px 14px",
              cursor: "pointer",
              border: "2px solid #ddd",
              borderRadius: "8px",
              fontWeight: filter === key ? "bold" : "normal",
              background: filter === key ? "#eee" : "white",
            }}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      {todos.length === 0 ? (
        <p style={{ color: "#888" }}>No tasks yet. Add one above!</p>
      ) : filteredTodos.length === 0 ? (
        <p style={{ color: "#888" }}>No {filter} tasks.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <span
                onClick={() => toggleTodo(todo.id)}
                style={{
                  cursor: "pointer",
                  flex: 1,
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "grey" : "black",
                }}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{ marginLeft: "12px", padding: "4px 10px", cursor: "pointer", border: "2px solid #ddd", borderRadius: "8px" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
        <span>{remainingCount} item{remainingCount === 1 ? "" : "s"} remaining</span>
        <button
          onClick={clearCompleted}
          style={{ padding: "6px 14px", cursor: "pointer", border: "2px solid #ddd", borderRadius: "8px" }}
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default TodoApp;
