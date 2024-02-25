import express from "express";
import cors from "cors";
import pool from "./db.js";
import dotenv from "dotenv";

const app = express();

//! Middlewares
dotenv.config();
app.use(cors());
app.use(express.json());

//!CREATE TODO
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;

    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

//! GET ALL TODOS
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

//! GET A TODO
app.get("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json(todo.rows);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

//! UPDATE A DODO
app.put("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const description = req.body.description;

    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json(updateTodo);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});
//! DELETE TODO
app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

    res.json({ message: "todo is deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});
app.listen(process.env.SERVER_PORT, () => {
  console.log("Server Started without any error");
});
