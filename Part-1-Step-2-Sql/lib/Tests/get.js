"use strict";
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
const should = chai.should();

chai.use(chaiHttp);

describe("Api Get all test 1", () => {
  it("should get all todos", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      .get("/todo/api/v1.0/todos")
      .end((err, res) => {
        res.should.have.status(200);
        done();
        // done();
      });
  });
});

describe("Api Get all test  2", () => {
  it("should check if the response is an array", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      .get("/todo/api/v1.0/todos")
      .end((err, res) => {
        res.body.should.be.a("array");
        done();
      });
  });
});

describe("Api Get all test 3", () => {
  it("should generate a server error since api url is not complete", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      .get("/todo/api/v1.0")
      .end((err, res) => {
        res.should.have.status("404");
        done();
      });
  });
});

describe("Api Get all test 4", () => {
  it("should a have property title in each object", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      .get("/todo/api/v1.0/todos")
      .end((err, res) => {
        res.body[res.body.length - 1].should.have.property("title");
        done();
      });
  });
});

describe("Api Get all test 5", () => {
  it("should a have property description in each object", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      .get("/todo/api/v1.0/todos")
      .end((err, res) => {
        res.body[res.body.length - 1].should.have.property("description");
        done();
      });
  });
});

describe("Api Get all test 6", () => {
  it("should a have property done in each object", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      .get("/todo/api/v1.0/todos")
      .end((err, res) => {
        res.body[res.body.length - 1].should.have.property("done");
        done();
      });
  });
});

describe("Api Get all test 7", () => {
  it("should a have property done in each object and the value will be true", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      .get("/todo/api/v1.0/todos")
      .end((err, res) => {
        res.body[res.body.length - 1].should.have.property("done");
        res.body[res.body.length - 1].should.have.property("done").eql(true);
        done();
      });
  });
});

describe("Api Get all test 8", () => {
    it("should a have property done in each object and the value will be false", done => {
      chai
        .request("https://ultimate-todo-web-postgres.herokuapp.com")
        .get("/todo/api/v1.0/todos")
        .end((err, res) => {
          res.body[res.body.length - 1].should.have.property("done");
          res.body[res.body.length - 1].should.have.property("done").eql(false);
          done();
        });
    });
});
