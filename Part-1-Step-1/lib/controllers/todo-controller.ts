import {todoSchema} from "../models/todo-model";
import * as mongoose from "mongoose";
import {Request,Response} from "express";

const ToDo = mongoose.model("ToDo",todoSchema);

export class TodoController {
    public AddNewTask(req:Request,res:Response) {
        
        ToDo.create(req.body).then(data => {
            res.send(data);
        })
        
    }
    public GetAllTasks(req:Request,res:Response){
        ToDo.find().then(data => {
            res.send(data);
        })
    }
    public GetSpecificTask(req:Request,res:Response){
        const task_id = req.params.id;
        ToDo.findById(task_id).then(data => {
            res.send(data);
        })
    }
    public UpdateTask (req:Request,res:Response){
        const task_id=req.params.id;
        ToDo.findByIdAndUpdate(task_id,req.body).then(data => {
            res.send(data);
        })
    }
    public DeleteTask (req:Request, res:Response){
        const task_id = req.params.id;
        ToDo.findByIdAndRemove(task_id).then(data => {
            res.send(data)
        })
    }
    }
    
