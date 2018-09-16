"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const methodOverride = require("method-override");
const todoRoutes_1 = require("./routes/todoRoutes");
const mongoose_connection_1 = require("./connection/mongoose-connection");
class App {
    constructor() {
        this.app = Express();
        this.routePrv = new todoRoutes_1.Routes();
        this.mongo_connection = new mongoose_connection_1.Connection();
        this.configuration();
    }
    configuration() {
        this.mongo_connection.connection();
        this.app.use(morgan('dev'));
        this.app.use(methodOverride());
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