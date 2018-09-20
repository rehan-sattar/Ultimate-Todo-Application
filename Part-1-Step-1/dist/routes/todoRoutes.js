"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_controller_1 = require("../controllers/todo-controller");
class Routes {
    constructor() {
        this.todocontroller = new todo_controller_1.TodoController();
    }
    routes(app) {
        //Update Done Status
        app.route("/todo/api/v1.0/tasks/:id/:status").put(this.todocontroller.UpdateDoneStatus);
        //Get List Of All Tasks
        app.route("/todo/api/v1.0/tasks/").get(this.todocontroller.GetAllTasks);
        //Get Specific Tasks
        app.route("/todo/api/v1.0/tasks/:id").get(this.todocontroller.GetSpecificTask);
        //Submit todo data
        app.route("/todo/api/v1.0/tasks").post(this.todocontroller.AddNewTask);
        //update data 
        app.route("/todo/api/v1.0/tasks/:id").put(this.todocontroller.UpdateTask);
        app.route("/todo/api/v1.0/tasks/:id").delete(this.todocontroller.DeleteTask);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=todoRoutes.js.map