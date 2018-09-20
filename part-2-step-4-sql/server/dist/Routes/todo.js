"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../Controller/controller");
class Routes {
    constructor() {
        this.todocontroller = new controller_1.default();
    }
    routes(app) {
        //GET LIST OF TODOS
        app.route("/todo/api/v1.0/todos").get(this.todocontroller.GetAllTodo);
        //GET SPECIFIC TODO
        app.route("/todo/api/v1.0/todos/:id").get(this.todocontroller.GetSpecificTodo);
        //ADD NEW TODO
        app.route("/todo/api/v1.0/todos").post(this.todocontroller.AddNewTodo);
        //UPDATE SPECIFIC TODO
        app.route("/todo/api/v1.0/todos/:id").put(this.todocontroller.UpdateTodo);
        //DELETE A TODO
        app.route("/todo/api/v1.0/todos/:id").delete(this.todocontroller.DeleteTodo);
    }
}
exports.default = Routes;
//# sourceMappingURL=todo.js.map