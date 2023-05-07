import React from "react";

function App() {
  const [todos, setTodos] = React.useState([]);
  const [text, setText] = React.useState("");
  const [editText, setEditText] = React.useState("");
  const [edit, setEdit] = React.useState({ id: 0, text: "" });

  const handleChange = (e) => {
    setText(e.currentTarget.value);
  };
  const handleEditChange = (e) => {
    setEditText(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = todos.length <= 0 ? 1 : todos[todos.length - 1].id + 1;

    setTodos([...todos, { id: id, text }]);
    setText("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editHandler = (todo) => {
    setEdit(todo);
  };

  const handleEdit = (id) => {
    setTodos(
      todos.map((todo) => {
        if (id === todo.id) {
          setEdit({ id: 0, text: "" });
          return { ...todo, text: editText };
        }
        return todo;
      })
    );
  };

  return (
    <div className="bg-zinc-300 w-full h-screen flex items-center justify-center text-2xl">
      <div>
        <div className="flex gap-5">
          <input
            className="px-4 py-2 rounded-lg border-2 border-stone-400 flex-1"
            placeholder="Swimming"
            onChange={handleChange}
            value={text}
          />
          <button
            onClick={handleSubmit}
            className="bg-cyan-400 hover:bg-cyan-500 px-5 py-2 rounded-lg border-2 border-cyan-500"
          >
            Add Todo
          </button>
        </div>
        {todos.map((todo, i) =>
          edit.id === todo.id ? (
            <div key={i}>
              <input
                className="px-4 py-2 rounded-lg border-2 border-stone-400 flex-1"
                placeholder="Swimming"
                onChange={handleEditChange}
                value={editText}
              />
              <button onClick={() => handleEdit(todo.id)}>Update</button>
              <button onClick={() => setEdit({ id: 0, text: "" })}>
                Cancel
              </button>
            </div>
          ) : (
            <div key={i}>
              <div>{todo.id}</div>
              <div>{todo.text}</div>
              <div>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
                <button onClick={() => editHandler(todo)}>Edit</button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
