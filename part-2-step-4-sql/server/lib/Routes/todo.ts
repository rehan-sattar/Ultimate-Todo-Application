import TodoController from '../Controller/controller'

class Routes{
    public todocontroller : TodoController;
    constructor(){
        this.todocontroller = new TodoController();
    }

    public routes(app){
        //GET LIST OF TODOS
        app.route("/todo/api/v1.0/todos").get(this.todocontroller.GetAllTodo)

        //GET SPECIFIC TODO
        app.route("/todo/api/v1.0/todos/:id").get(this.todocontroller.GetSpecificTodo)

        //ADD NEW TODO
        app.route("/todo/api/v1.0/todos").post(this.todocontroller.AddNewTodo)

        //UPDATE SPECIFIC TODO
        app.route("/todo/api/v1.0/todos/:id").put(this.todocontroller.UpdateTodo)

        //DELETE A TODO
        app.route("/todo/api/v1.0/todos/:id").delete(this.todocontroller.DeleteTodo)
    }
}

export default Routes;