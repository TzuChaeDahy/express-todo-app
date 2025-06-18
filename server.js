const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors"); //

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

let todos = [
  { id: uuidv4(), title: "Aprender Node.js", completed: false },
  { id: uuidv4(), title: "Criar uma API To-Do", completed: true },
  { id: uuidv4(), title: "Praticar Express", completed: false },
];

app.get("/todos", (req, res) => {
  res.status(200).json(todos);
});

app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  const todo = todos.find((t) => t.id === id);

  if (todo) {
    res.status(200).json(todo);
  } else {
    res.status(404).json({ message: "To-Do não encontrado." });
  }
});

app.post("/todos", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res
      .status(400)
      .json({ message: "O título do To-Do é obrigatório." });
  }

  const newTodo = {
    id: uuidv4(),
    title,
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const { id } = req.params;

  const todoIndex = todos.findIndex((t) => t.id === id);

  if (todoIndex > -1) {
    const currentTodo = todos[todoIndex];

    todos[todoIndex] = {
      ...currentTodo,
      completed: !currentTodo.completed,
    };
    res.status(200).json(todos[todoIndex]);
  } else {
    res.status(404).json({ message: "To-Do não encontrado." });
  }
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const initialLength = todos.length;
  todos = todos.filter((t) => t.id !== id);

  if (todos.length < initialLength) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "To-Do não encontrado." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
