"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_model_1 = require("../models/todo-model");
const mongoose = require("mongoose");
const ToDo = mongoose.model("ToDo", todo_model_1.todoSchema);
class TodoController {
    AddNewTask(req, res) {
        console.log('inside AddNewTask');
        console.log('Add new task hitted!');
        ToDo.create(req.body).then(data => {
            console.log('inside it')
            res.send(data);
        });
    }
    GetAllTasks(req, res) {
        ToDo.find().then(data => {
            res.send(data);
        });
    }
    GetSpecificTask(req, res) {
        const task_id = req.params.id;
        ToDo.findById(task_id).then(data => {
            res.send(data);
        });
    }
    UpdateTask(req, res) {
        const task_id = req.params.id;
        ToDo.findByIdAndUpdate(task_id, req.body).then(data => {
            res.send(data);
        });
    }
    DeleteTask(req, res) {
        const task_id = req.params.id;
        ToDo.findByIdAndRemove(task_id).then(data => {
            res.send(data);
        });
    }
}
exports.TodoController = TodoController;
//# sourceMappingURL=todo-controller.js.map