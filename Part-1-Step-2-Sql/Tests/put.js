"use strict";
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
const should = chai.should();

chai.use(chaiHttp);

describe("Api Put test 1", () => {
  it("should update the todo successfully", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .put("/todo/api/v1.0/todos/890fac24-735b-441e-ac2d-636d5dcf8148")
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

describe("Api Put test 2", () => {
  it("should have response as an array", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .put("/todo/api/v1.0/todos/890fac24-735b-441e-ac2d-636d5dcf8148")
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

describe("Api Put test  3", () => {
  it("should return a response array of object containing updated todo", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .put("/todo/api/v1.0/todos/890fac24-735b-441e-ac2d-636d5dcf8148")
      .send({
        title: "Title for test",
        description: "New description"
      })
      .end((err, res) => {
        res.body[0].should.have
          .property("id")
          .eql("890fac24-735b-441e-ac2d-636d5dcf8148");
        res.body[0].should.have.property("title").eql("Title for test");
        res.body[0].should.have.property("description").eql("New description");
        res.body[0].should.have.property("done");
        done();
      });
  });
});

describe("Api Put test  4", () => {
  it("should return a response array of object containing message property", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .put("/todo/api/v1.0/todos/890fac24-735b-441e-ac2d-636d5dcf8148")
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

describe("Api Put test  5", () => {
  it("should return a response array of object containing message property with success message", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .put("/todo/api/v1.0/todos/890fac24-735b-441e-ac2d-636d5dcf8148")
      .send({
        title: "Title for test",
        description: "New description"
      })
      .end((err, res) => {
        res.body[res.body.length - 1].should.have
          .property("message")
          .eql("Todo updated successfully");
        done();
      });
  });
});

describe("Api Put test  6", () => {
  it("should return a response array of object containing status property", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .put("/todo/api/v1.0/todos/890fac24-735b-441e-ac2d-636d5dcf8148")
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

describe("Api Put test  7", () => {
  it("should return a response array of object containing status property with value true", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .put("/todo/api/v1.0/todos/890fac24-735b-441e-ac2d-636d5dcf8148")
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

describe("Api Put test  8", () => {
  it("should returns internal server error since description is missing", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .put("/todo/api/v1.0/todos/890fac24-735b-441e-ac2d-636d5dcf8148")
      .send({
        title: "Title for test"
      })
      .end((err, res) => {
        res.should.have.status("500");
        done();
      });
  });
});

describe("Api Put test  9", () => {
  it("should returns a object property status", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .put("/todo/api/v1.0/todos/890fac24-735b-441e-ac2d-636d5dcf8148")
      .send({
        title: "Title for test"
      })
      .end((err, res) => {
        res.body[res.body.length - 1].should.have.property("status");
        done();
      });
  });
});

describe("Api Put test  10", () => {
  it("should returns a object property status false", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .put("/todo/api/v1.0/todos/890fac24-735b-441e-ac2d-636d5dcf8148")
      .send({
        title: "Title for test"
      })
      .end((err, res) => {
        res.body[res.body.length - 1].should.have.property("status").eql(false);
        done();
      });
  });
});

describe("Api Put test  11", () => {
  it("should returns a object property message", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .put("/todo/api/v1.0/todos/890fac24-735b-441e-ac2d-636d5dcf8148")
      .send({
        title: "Title for test"
      })
      .end((err, res) => {
        res.body[res.body.length - 1].should.have.property("message");
        done();
      });
  });
});
describe("Api Put test  12", () => {
  it("should returns a object property message with value", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .put("/todo/api/v1.0/todos/890fac24-735b-441e-ac2d-636d5dcf8148")
      .send({
        title: "Title for test"
      })
      .end((err, res) => {
        res.body[0].should.have.property("message")
        .eql("Parameters missing");
        done();
      });
  });
});

describe("Api Put test  13", () => {
  it("should returns a object property message with value", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .put("/todo/api/v1.0/todos/890fac24-735b-441e-ac2d-636d5dcf8148")
      .send({
        title: "Title for test"
      })
      .end((err, res) => {
        res.body[0].should.have.property("status")
        .eql(false);
        done();
      });
  });
});


describe("Api Put test  14", () => {
  it("should returns server error 404 since id is missing", done => {
    chai
      .request("https://ultimate-todo-web-postgres.herokuapp.com")
      //THE ID HERE MAY CHANGE IN FUTURE
      .put("/todo/api2/v1.0/todos")
      .send({
        title: "Title for test",
        description : "Description"
      })
      .end((err, res) => {
        res.should.have.status("404"); // Means api not found
        done();
      });
  });
});
