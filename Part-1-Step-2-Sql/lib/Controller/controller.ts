import { Request, Response } from "express";
import * as pg from "pg";
const uuid = require("uuid");

const config = {
  host: "ec2-184-73-197-211.compute-1.amazonaws.com",
  user: "ycofgzasirhggj", 
  password: "2000701ba901b6d74731a32bafe98a1cc979a8fe9930ba60c326e18669a24bab",
  database: "d4t8u6uontg6u2"
};

class TodoController {
  public AddNewTodo(req: Request, res: Response) {
    const client = new pg.Client(config);
    client.connect();
    const { title, description } = req.body;
    if (!(title && description)) {
      res.status(500).send([{ message: "Parameters missing", status: false }]);
      return;
    }
    (async function hit() {
      try {
        const response = await client.query(
          `INSERT INTO TODO(ID,TITLE,DESCRIPTION)
          VALUES($1,$2,$3)`,
          [uuid(), title, description]
        );
        client.end();
        const resSend = response.rowCount
          ? { message: "Todo added successfully", status: true }
          : { message: "Unable add a todo", status: false };
        res.status(200).send([resSend]);
      } catch (err) {
        res
          .status(500)
          .send([{ message: "Unable to add new todo", status: false }, err]);
      }
    })();
  }

  public GetAllTodo(req: Request, res: Response) {
    const client = new pg.Client(config);
    client.connect();
    (async function hit() {
      try {
        const response = await client.query("SELECT * FROM TODO");
        client.end();
        res.status(200).send(response.rows);
      } catch (err) {
        res
          .status(500)
          .send([{ message: "Server Error!", status: false }, err]);
      }
    })();
  }
  public GetSpecificTodo(req: Request, res: Response) {
    const client = new pg.Client(config);
    client.connect();
    const { id } = req.params;
    (async function hit() {
      try {
        const response = await client.query(
          "SELECT * FROM TODO WHERE ID = $1",
          [id]
        );
        client.end();
        res.status(200).send(response.rows);
      } catch (err) {
        res
          .status(500)
          .send([{ message: "Server Error!", status: false }, err]);
      }
    })();
  }

  public UpdateDone(req: Request, res: Response) {
    const client = new pg.Client(config);
    client.connect();
    const { done } = req.body;
    const { id } = req.params;
    if (!done) {
      res
        .status(500)
        .send([{ message: "Parameter done missing", status: false }]);
      return;
    }
    (async function hit() {
      try {
        const response = await client.query(
          `UPDATE TODO 
        SET DONE = $1
        WHERE ID = $2`,
          [done, id]
        );
        res.send(response);
        let response2;
        if (response.rowCount) {
          response2 = await client.query(`SELECT * FROM TODO WHERE ID = $1`, [
            id
          ]);
          client.end();
          res.status(200).send(
            response2.rows.concat([
              done
                ? {
                    message: "Todo added to done list successfully",
                    status: true
                  }
                : {
                    message: "Todo added to undone list successfully",
                    status: true
                  }
            ])
          );
          return;
        }
        res
          .status(200)
          .send([null, { message: "Unable update a todo", status: false }]);
        client.end();
      } catch (err) {
        res
          .status(500)
          .send([{ message: "Unable to update", status: false }, err]);
      }
    })();
  }

  public UpdateTodo(req: Request, res: Response) {
    const client = new pg.Client(config);
    client.connect();
    const { id } = req.params;
    const { title, description } = req.body;
    if (!(title && description)) {
      res.status(500).send([{ message: "Parameters missing", status: false }]);
      return;
    }
    (async function hit() {
      try {
        const response = await client.query(
          `UPDATE TODO 
        SET TITLE = $1, DESCRIPTION = $2
        WHERE ID = $3`,
          [title, description, id]
        );
        if (response.rowCount) {
          let response2 = await client.query(
            "SELECT * FROM TODO WHERE ID = $1",
            [id]
          );
          res.status(200).send(
            response2.rows.concat([
              {
                message: "Todo updated successfully",
                status: true
              }
            ])
          );
          return;
        }
        res
          .status(200)
          .send([null, { message: "Unable update a todo", status: false }]);
        client.end();
      } catch (err) {
        res
          .status(500)
          .send([{ message: "Unable to update", status: false }, err]);
      }
    })();
  }

  /**/

  public DeleteTodo(req: Request, res: Response) {
    const client = new pg.Client(config);
    client.connect();
    const { id } = req.params;
    (async function hit() {
      try {
        const response = await client.query(`DELETE FROM TODO WHERE ID = $1`, [
          id
        ]);
        client.end();
        const resSend = response.rowCount
          ? { message: "Todo deleted successfully", status: true }
          : { message: "Unable deleted a todo", status: false };
        res.status(200).send([resSend]);
      } catch (err) {
        res
          .status(500)
          .send([{ message: "Unable to delete", status: false }, err]);
      }
    })();
  }
}

export default TodoController;
