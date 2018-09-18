"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const bodyParser = require("body-parser");
const todo_1 = require("./Routes/todo");
class App {
    constructor() {
        this.app = Express();
        this.routePrv = new todo_1.default();
        this.configuration();
    }
    configuration() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Credentials", "true");
            res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
            res.header("Access-Control-Allow-Headers", "Content-Type");
            next();
        });
        this.routePrv.routes(this.app);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map