import * as mongoose from "mongoose";
export class Connection{
    public connection(){
        mongoose.connect("mongodb://admin-todo1:admin-todo1@ds159782.mlab.com:59782/ultimate-todo-app",{useNewUrlParser:true});
        let db=mongoose.connection;
db.once("open",() => {
    console.log("Connection is opened");
    return db;
})
db.on("error",console.error.bind(console,"Connection Error"));
    }
}