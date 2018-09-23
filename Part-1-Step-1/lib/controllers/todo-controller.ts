import {todoSchema} from "../models/todo-model";
import * as mongoose from "mongoose";
import {Request,Response} from "express";

const ToDo = mongoose.model("ToDo",todoSchema);

export class TodoController {
    public UpdateDoneStatus(req:Request,res:Response){
        let status;
        if(req.params.status === "true")
            status=true;
        else if(req.params.status === "false")
            status=false;
            console.log(req.params.id);
        ToDo.findByIdAndUpdate(req.params.id,{$set:{Done:status}},{new:true}).then(data => {
            console.log(data);
            ToDo.findById({_id:data._id}).then(realData => {
                res.status(200).send(realData)
            })
        })
    }
    public AddNewTask(req:Request,res:Response) {
        
        ToDo.create(req.body).then(data => {
               const obj ={...data};
            res.status(200).send({data:obj._doc, status:obj.$__.inserting});
           
           
           
           
            
        })
        
    }
    public GetAllTasks(req:Request,res:Response){
        ToDo.find().then(data => {
            res.status(200).send(data);
        })
    }
    public GetSpecificTask(req:Request,res:Response){
        const task_id = req.params.id;
        ToDo.findById(task_id).then(data => {
            res.status(200).send(data);
        })
    }
    public UpdateTask (req:Request,res:Response){
        const task_id=req.params.id;
        ToDo.findByIdAndUpdate(task_id,{$set:req.body}).then(data => {
            ToDo.findById({_id:data._id}).then(realData => {
                res.status(200).send(realData)
            })
        })
    }
    public DeleteTask (req:Request, res:Response){
        const task_id = req.params.id;
        ToDo.findByIdAndRemove(task_id).then(data => {
            const obj ={...data};
            for(let key in obj){

                if(obj.hasOwnProperty(key)){
                    res.send({status:true})
                    return;
                }
            }
            res.send({status:false})
        })
    }
    }
    
