import mongoose, { Schema } from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/todo");

const todoSchema = new Schema(
    {
        task: {
            type: String,
            required: true
        }
    }
);

export const Todo = mongoose.model("todo", todoSchema);