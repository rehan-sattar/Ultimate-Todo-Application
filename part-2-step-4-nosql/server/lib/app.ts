import * as Express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/todoRoutes"
import { Connection } from "./connection/mongoose-connection"
import { Request, Response } from "express";

class App {
    public app: Express.Application;
    public routePrv: Routes
    public mongo_connection: Connection
    constructor() {
        this.app = Express();
        this.routePrv = new Routes();
        this.mongo_connection = new Connection();
        this.configuration();
    }
    private configuration(): void {
        this.mongo_connection.connection();
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use((req: Request, res: Response, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Credentials", "true");
            res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
            res.header("Access-Control-Allow-Headers", "Content-Type");
            next();
        })
        this.routePrv.routes(this.app);
    }
}
export default new App().app;














