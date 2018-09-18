import {Request,Response} from "express";
import {TodoController} from "../controllers/todo-controller"
export class Routes {
    public todocontroller : TodoController
    constructor(){
        this.todocontroller=new TodoController();
    }
    public routes(app){
        //Get List Of All Tasks
        app.route("/todo/api/v1.0/tasks").get(this.todocontroller.GetAllTasks)

        //Get Specific Tasks

        app.route("/todo/api/v1.0/tasks/:id").get(this.todocontroller.GetSpecificTask)

        //Submit todo data // conflict issue
        app.route("/todo/api/v1.0/addTask").post(this.todocontroller.AddNewTask)

        //update data 

        app.route("/todo/api/v1.0/tasks/:id").put(this.todocontroller.UpdateTask)

        app.route("/todo/api/v1.0/tasks/:id").delete(this.todocontroller.DeleteTask)
    }
}