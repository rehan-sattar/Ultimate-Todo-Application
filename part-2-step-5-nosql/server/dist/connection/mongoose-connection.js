"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class Connection {
    connection() {
        mongoose.connect("mongodb://localhost:27017/Todo", { useNewUrlParser: true });
        let db = mongoose.connection;
        db.once("open", () => {
            console.log("Connection is opened");
            return db;
        });
        db.on("error", console.error.bind(console, "Connection Error"));
    }
}
exports.Connection = Connection;
//# sourceMappingURL=mongoose-connection.js.map