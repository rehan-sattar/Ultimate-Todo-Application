"use strict";
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
const should = chai.should();

chai.use(chaiHttp);

describe("Api Delete test 1", () => {
  it("should delete the todo successfully", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .delete("/todo/api/v1.0/todos/55d02b6b-fd08-490c-87fa-c211bfcb84f6") //ID
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe("Api Delete test 2", () => {
  it("should have response as an array", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .delete("/todo/api/v1.0/todos/890fac24-735b-441e-ac2d-636d5dcf8148") //ID
      .end((err, res) => {
        res.body.should.be.a("array");
        done();
      });
  });
});

describe("Api Delete test  3", () => {
  it("should return a response array of object containing message property", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .delete("/todo/api/v1.0/todos/3d95e228-b96d-47d1-82a9-df9d48d8404c") //ID
      .end((err, res) => {
        res.body[res.body.length - 1].should.have.property("message");
        done();
      });
  });
});

describe("Api Delete test  4", () => {
  it("should return a response array of object containing message property with success message", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .delete("/todo/api/v1.0/todos/8238cda5-38d2-41af-bd35-b720fe9add6b") //ID
      .end((err, res) => {
        res.body[res.body.length - 1].should.have
          .property("message")
          .eql("Todo deleted successfully");
        done();
      });
  });
});

describe("Api Delete test  5", () => {
  it("should return a response array of object containing status property", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .delete("/todo/api/v1.0/todos/6f4c3bec-d47d-499a-8b22-c27aada08ea6") //ID
      .end((err, res) => {
        res.body[res.body.length - 1].should.have.property("status");
        done();
      });
  });
});

describe("Api Delete test  6", () => {
  it("should return a response array of object containing status property", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .delete("/todo/api/v1.0/todos/b2207147-7745-48b9-8941-baedb8846fe8") //ID
      .end((err, res) => {
        res.body[res.body.length - 1].should.have.property("id");
        done();
      });
  });
});

describe("Api Delete test  7", () => {
  it("should return a response array of object containing status property", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .delete("/todo/api/v1.0/todos/bdad7f54-ba9f-4c0b-9dd1-0422571ba647") //ID
      .end((err, res) => {
        res.body[res.body.length - 1].should.have
          .property("id")
          .eql("bdad7f54-ba9f-4c0b-9dd1-0422571ba647");
        done();
      });
  });
});

describe("Api Delete test  8", () => {
  it("should return a response array of object containing status property with value true", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .delete("/todo/api/v1.0/todos/f90d37ea-d049-4d75-b1e4-11c3e99ca474") //ID
      .end((err, res) => {
        res.body[res.body.length - 1].should.have.property("status").eql(true);
        done();
      });
  });
});

describe("Api Delete test  9", () => {
  it("should returns internal server error since id is missing", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .delete("/todo/api/v1.0/todos")
      .end((err, res) => {
        res.should.have.status("404");
        done();
      });
  });
});

describe("Api Delete test  10", () => {
  it("should returns status false since no such todo exists", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .delete("/todo/api/v1.0/todos/50") //ID
      .end((err, res) => {
        res.should.have.status("200");
        res.body[res.body.length - 1].should.have.property("status").eql(false);
        done();
      });
  });
});

describe("Api Delete test  11", () => {
  it("should returns message Unable deleted a todo since no such todo exists", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .delete("/todo/api/v1.0/todos/50") //ID
      .end((err, res) => {
        res.body[res.body.length - 1].should.have
          .property("message")
          .eql("Unable deleted a todo");
        done();
      });
  });
});

describe("Api Delete test  12", () => {
  it("should returns not found error since url is wrong", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .delete("/todo1/api2/v1.2/todos/50") //ID
      .end((err, res) => {
        res.should.have.status("404");
        done();
      });
  });
});
