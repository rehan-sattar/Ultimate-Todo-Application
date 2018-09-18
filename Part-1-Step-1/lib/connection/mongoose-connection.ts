import * as mongoose from "mongoose";
export class Connection {
    public connection() {
        mongoose.connect("mongodb://localhost:27017/Todo", { useNewUrlParser: true });
        let db = mongoose.connection;
        db.once("open", () => {
            console.log("Connection is opened");
            return db;
        })
        db.on("error", console.error.bind(console, "Connection Error"));
    }
}