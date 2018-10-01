import * as Express from "express";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as methodOverride from "method-override";
import {Routes} from "./routes/todoRoutes"
import {Connection} from "./connection/mongoose-connection"
import {Request,Response} from "express";
import * as csp from "helmet-csp";

class App{
    public app:Express.Application;
    public routePrv :Routes
    public mongo_connection:Connection
    constructor(){
        this.app=Express();
        this.routePrv=new Routes();
        this.mongo_connection=new Connection();
        this.configuration();
    }
    private  configuration(): void{
        this.mongo_connection.connection();
        this.app.use(morgan('dev'));
        this.app.use(methodOverride());
        this.app.use(bodyParser.urlencoded({extended:false}));
        this.app.use(bodyParser.json());
        const Port = process.env.PORT || 5000;
        this.app.use((req:Request,res:Response,next) => {
            res.header("Access-Control-Allow-Origin","*");
            res.header("Access-Control-Allow-Credentials","true");
            res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE");
            res.header("Access-Control-Allow-Headers","Content-Type");
            next();
        })

        this.routePrv.routes(this.app);
        this.app.listen(Port,() => {
    console.log("Express Server Listening On Port " + Port);
})
    }
}
export default new App().app;














