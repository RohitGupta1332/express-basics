import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { Todo } from "./models/todo.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/create", async (req, res) => {
    try {
        let details = {
            task: req.body.task
        };

        let createdTodo = await Todo.create(details);
        res.status(200).send(createdTodo);
    }
    catch (error) {
        res.status(500).send("Internal Server error!");
    }

})

app.get("/get-todo", async (req, res) => {
    try {
        const todoData = await Todo.find();
        if (!todoData.length) {
            res.status(404).send("Data not found");
        } else {
            res.status(200).send(todoData);
        }
    }
    catch (error) {
        res.status(500).send("Internal Server error!");
    }
});

app.delete("/delete-todo", async (req, res) => {
    try {
        const deleteTodo = await Todo.deleteOne({_id: req.body.id});
        res.status(200).send(deleteTodo);
    }
    catch(error){
        res.status(500).send("Internal Server error!");
    }
})

app.listen(3000);

