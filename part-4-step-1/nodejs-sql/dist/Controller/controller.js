"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg = require("pg");
const uuid = require("uuid");
const config = {
    host: "ec2-184-73-197-211.compute-1.amazonaws.com",
    user: "ycofgzasirhggj",
    password: "2000701ba901b6d74731a32bafe98a1cc979a8fe9930ba60c326e18669a24bab",
    database: "d4t8u6uontg6u2"
};
class TodoController {
    AddNewTodo(req, res) {
        const client = new pg.Client(config);
        client.connect();
        const data = req.body;
        (function hit() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield client.query(`INSERT INTO TODO(ID,TITLE,DESCRIPTION)
          VALUES($1,$2,$3)`, [uuid(), data.title, data.description]);
                    client.end();
                    const resSend = response.rowCount
                        ? { message: "Todo added successfully", status: true }
                        : { message: "Unable add a todo", status: false };
                    res.status(200).send([resSend]);
                }
                catch (err) {
                    res
                        .status(500)
                        .send([{ message: "Unable to add new todo", status: false }, err]);
                }
            });
        })();
    }
    GetAllTodo(req, res) {
        const client = new pg.Client(config);
        client.connect();
        (function hit() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield client.query("SELECT * FROM TODO");
                    client.end();
                    res.status(200).send(response.rows);
                }
                catch (err) {
                    res
                        .status(500)
                        .send([{ message: "Server Error!", status: false }, err]);
                }
            });
        })();
    }
    GetSpecificTodo(req, res) {
        const client = new pg.Client(config);
        client.connect();
        const { id } = req.params;
        (function hit() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield client.query("SELECT * FROM TODO WHERE ID = $1", [id]);
                    client.end();
                    res.status(200).send(response.rows);
                }
                catch (err) {
                    res
                        .status(500)
                        .send([{ message: "Server Error!", status: false }, err]);
                }
            });
        })();
    }
    UpdateDone(req, res) {
        const client = new pg.Client(config);
        client.connect();
        const { done } = req.body;
        const { id } = req.params;
        (function hit() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield client.query(`UPDATE TODO 
        SET DONE = $1
        WHERE ID = $2`, [done, id]);
                    client.end();
                    const resSend = response.rowCount
                        ? (done
                            ? { message: "Todo added to done list successfully", status: true }
                            : { message: "Todo added to undone list successfully", status: true })
                        : { message: "Unable update a todo", status: false };
                    res.status(200).send([resSend]);
                }
                catch (err) {
                    res
                        .status(500)
                        .send([{ message: "Unable to update", status: false }, err]);
                }
            });
        })();
    }
    UpdateTodo(req, res) {
        const client = new pg.Client(config);
        client.connect();
        const { id } = req.params;
        const { title, description } = req.body;
        (function hit() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield client.query(`UPDATE TODO 
        SET TITLE = $1, DESCRIPTION = $2
        WHERE ID = $3`, [title, description, id]);
                    client.end();
                    const resSend = response.rowCount
                        ? { message: "Todo updated successfully", status: true }
                        : { message: "Unable update a todo", status: false };
                    res.status(200).send([resSend]);
                }
                catch (err) {
                    res
                        .status(500)
                        .send([{ message: "Unable to update", status: false }, err]);
                }
            });
        })();
    }
    /**/
    DeleteTodo(req, res) {
        const client = new pg.Client(config);
        client.connect();
        const { id } = req.params;
        (function hit() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield client.query(`DELETE FROM TODO WHERE ID = $1`, [
                        id
                    ]);
                    client.end();
                    const resSend = response.rowCount
                        ? { message: "Todo deleted successfully", status: true }
                        : { message: "Unable deleted a todo", status: false };
                    res.status(200).send([resSend]);
                }
                catch (err) {
                    res
                        .status(500)
                        .send([{ message: "Unable to delete", status: false }, err]);
                }
            });
        })();
    }
}
exports.default = TodoController;
//# sourceMappingURL=controller.js.map