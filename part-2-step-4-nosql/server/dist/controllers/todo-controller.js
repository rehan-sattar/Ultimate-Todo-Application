"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_model_1 = require("../models/todo-model");
const mongoose = require("mongoose");
const ToDo = mongoose.model("ToDo", todo_model_1.todoSchema);
class TodoController {
    UpdateDoneStatus(req, res) {
        let status;
        if (req.params.status === "true")
            status = true;
        else if (req.params.status === "false")
            status = false;
        else if (req.params.status === "null") {
            res.status(404).send({ message: "Invalid Done Status" });
        }
        else if (req.params.status === "undefined") {
            res.status(404).send({ message: "Invalid Done Status" });
        }
        else
            res.status(404).send({ message: "Invalid Done Status" });
        ToDo.findByIdAndUpdate(req.params.id, { $set: { Done: status } }, { new: true }).then(data => {
            console.log(data);
            ToDo.findById({ _id: data._id }).then(realData => {
                res.status(200).send(realData);
            });
        });
    }
    AddNewTask(req, res) {
        ToDo.create(req.body).then(data => {
            const obj = Object.assign({}, data);
            res.status(200).send({ data: obj._doc, status: obj.$__.inserting });
        });
    }
    GetAllTasks(req, res) {
        ToDo.find().then(data => {
            res.status(200).send(data);
        });
    }
    GetSpecificTask(req, res) {
        const task_id = req.params.id;
        ToDo.findById(task_id).then(data => {
            res.status(200).send(data);
        }).catch(error => res.status(404).send({ message: "Record Not Found" }));
    }
    UpdateTask(req, res) {
        const task_id = req.params.id;
        ToDo.findByIdAndUpdate(task_id, { $set: req.body }).then(data => {
            ToDo.findById(data._id).then(realData => {
                res.status(200).send(realData);
            });
        }).catch(() => {
            res.status(500).send({ message: "Record Not Found" });
        });
    }
    DeleteTask(req, res) {
        const task_id = req.params.id;
        ToDo.findByIdAndRemove(task_id).then(data => {
            const obj = Object.assign({}, data);
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    res.send({ id: req.params.id, status: true });
                    return;
                }
            }
            res.send({ status: false });
        }).catch(error => res.status(404).send({ status: false }));
    }
}
exports.TodoController = TodoController;
//# sourceMappingURL=todo-controller.js.map