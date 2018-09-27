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
      .delete("/todo/api/v1.0/todos/1")//ID
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
      .delete("/todo/api/v1.0/todos/2")//ID
      .end((err, res) => {
        res.body.should.be.a("array");
        done();
      });
  });
});

describe("Api Put test  3", () => {
  it("should return a response array of object containing message property", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .delete("/todo/api/v1.0/todos/3")//ID
      .end((err, res) => {
        res.body[res.body.length - 1].should.have.property("message");
        done();
      });
  });
});

describe("Api Put test  4", () => {
  it("should return a response array of object containing message property with success message", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .delete("/todo/api/v1.0/todos/4")//ID
      .end((err, res) => {
        res.body[res.body.length - 1].should.have
          .property("message")
          .eql("Todo deleted successfully");
        done();
      });
  });
});

describe("Api Put test  5", () => {
  it("should return a response array of object containing status property", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .delete("/todo/api/v1.0/todos/5")//ID
      .end((err, res) => {
        res.body[res.body.length - 1].should.have.property("status");
        done();
      });
  });
});

describe("Api Put test  6", () => {
  it("should return a response array of object containing status property with value true", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .delete("/todo/api/v1.0/todos/6")//ID
      .end((err, res) => {
        res.body[res.body.length - 1].should.have.property("status").eql(true);
        done();
      });
  });
});

describe("Api Put test  7", () => {
  it("should returns internal server error since id is missing", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .delete("/todo/api/v1.0/todos/")//ID
      .end((err, res) => {
        res.should.have.status("404");
        done();
      });
  });
});

describe("Api Put test  8", () => {
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

describe("Api Put test  9", () => {
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

describe("Api Put test  10", () => {
  it("should returns not found error since url is wrong", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .delete("/todo1/api2/v1.2/todos/50")//ID
      .end((err, res) => {
        res.should.have.status("404");
        done();
      });
  });
});
