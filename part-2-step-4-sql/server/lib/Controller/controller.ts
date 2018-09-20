import { Request, Response } from "express";
import * as pg from "pg";
const uuid = require("uuid");

const config = {
  host: "ec2-54-83-27-165.compute-1.amazonaws.com",
  user: "oxwwzbajkyvyiv",
  password: "6db119531d151863acb80753592f431dd65b41a3a450eb6be3348f6609ce6d42",
  database: "d25vaam4oclrc0"
};

class TodoController {
  public AddNewTodo(req: Request, res: Response) {
    const client = new pg.Client(config);
    client.connect();
    const data = req.body;
    (async function hit() {
      try {
        const response = await client.query(
          `INSERT INTO TODO(ID,TITLE,DESCRIPTION)
          VALUES($1,$2,$3)`,
          [uuid(), data.title, data.description]
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

  public UpdateTodo(req: Request, res: Response) {
    const client = new pg.Client(config);
    client.connect();
    const { id } = req.params;
    const { title, description } = req.body;
    (async function hit() {
      try {
        const response = await client.query(
          `UPDATE TODO 
        SET TITLE = $1, DESCRIPTION = $2
        WHERE ID = $3`,
          [title, description, id]
        );
        client.end();
        const resSend = response.rowCount
          ? { message: "Todo updated successfully", status: true }
          : { message: "Unable update a todo", status: false };
        res.status(200).send([resSend]);
      } catch (err) {
        res
          .status(500)
          .send([{ message: "Unable to update", status: false }, err]);
      }
    })();
  }

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
