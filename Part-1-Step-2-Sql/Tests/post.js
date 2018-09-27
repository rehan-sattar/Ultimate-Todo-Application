"use strict";
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
const should = chai.should();

chai.use(chaiHttp);

describe("Api Post test 1", () => {
  it("should add todo successfull", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      .post("/todo/api/v1.0/todos")
      .send({
        title: "Title for test",
        description: "New description"
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe("Api Post test 2", () => {
  it("should have response as an array", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      .post("/todo/api/v1.0/todos")
      .send({
        title: "Title for test",
        description: "New description"
      })
      .end((err, res) => {
        res.body.should.be.a("array");
        done();
      });
  });
});

describe("Api Post test  3", () => {
  it("should return a response array of object containing message property", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      .post("/todo/api/v1.0/todos")
      .send({
        title: "Title for test",
        description: "New description"
      })
      .end((err, res) => {
        res.body[res.body.length - 1].should.have.property("message");
        done();
      });
  });
});

describe("Api Post test  4", () => {
  it("should return a response array of object containing message property with success message", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      .post("/todo/api/v1.0/todos")
      .send({
        title: "Title for test",
        description: "New description"
      })
      .end((err, res) => {
        res.body[res.body.length - 1].should.have
          .property("message")
          .eql("Todo added successfully");
        done();
      });
  });
});

describe("Api Post test  5", () => {
  it("should return a response array of object containing status property", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      .post("/todo/api/v1.0/todos")
      .send({
        title: "Title for test",
        description: "New description"
      })
      .end((err, res) => {
        res.body[res.body.length - 1].should.have.property("status");
        done();
      });
  });
});

describe("Api Post test  6", () => {
  it("should return a response array of object containing status property with value true", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      .post("/todo/api/v1.0/todos")
      .send({
        title: "Title for test",
        description: "New description"
      })
      .end((err, res) => {
        res.body[res.body.length - 1].should.have.property("status").eql(true);
        done();
      });
  });
});

describe("Api Post test  7", () => {
  it("should returns internal server error since description is missing", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      .post("/todo/api/v1.0/todos")
      .send({
        title: "Title for test"
      })
      .end((err, res) => {
        res.should.have.status("500");
        done();
      });
  });
});

describe("Api Post test  8", () => {
  it("should returns internal server error since body is empty", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      .post("/todo/api/v1.0/todos")
      .send({})
      .end((err, res) => {
        res.should.have.status("500");
        done();
      });
  });
});

describe("Api Post test  9", () => {
  it("should returns an array of object and propert status with value false", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      .post("/todo/api/v1.0/todos")
      .send({})
      .end((err, res) => {
        res.body[0].should.have.property("status").eql(false);
        // Means enable to add a todo defined by the developer
        done();
      });
  });
});

describe("Api Post test  10", () => {
  it("should returns an array of object and propert message with value Unable to add new todo", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      .post("/todo/api/v1.0/todos")
      .send({})
      .end((err, res) => {
        res.body[0].should.have
          .property("message")
          .eql("Unable to add new todo");
        // Means enable to add a todo defined by the developer
        done();
      });
  });
});

describe("Api Post test  11", () => {
  it("should returns an array of object and propert message with value Parameters missing", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      .post("/todo/api/v1.0/todos")
      .send({})
      .end((err, res) => {
        res.body[0].should.have
          .property("message")
          .eql("Parameters missing");
        // Means enable to add a todo defined by the developer
        done();
      });
  });
});

describe("Api Post test  12", () => {
  it("should returns server error 404 since api url is not correct", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      .post("/todo/api2/v1.0/todos")
      .send({})
      .end((err, res) => {
        res.should.have.status("404"); // Means api not found
        done();
      });
  });
});