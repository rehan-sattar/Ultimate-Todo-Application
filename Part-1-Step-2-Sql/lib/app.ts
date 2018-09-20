import * as Express from "express";
import * as bodyParser from "body-parser";
import Routes from "./Routes/todo";
import { Request, Response } from "express";

class App {
  public app: Express.Application;
  public routePrv: Routes;
  constructor() {
    this.app = Express();
    this.routePrv = new Routes();
    this.configuration();
  }
  private configuration(): void {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use((req: Request, res: Response, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header("Access-Control-Allow-Headers", "Content-Type");
      next();
    });
    this.routePrv.routes(this.app);
  }
}
export default new App().app;
