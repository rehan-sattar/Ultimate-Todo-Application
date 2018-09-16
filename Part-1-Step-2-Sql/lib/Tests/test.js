"use strict";
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
const should = chai.should();

chai.use(chaiHttp);

// UNCOMMENT THE TESTS YOU WANT TO CHECK
//THAN RUN NPM TEST IN TERMINAL

// describe("Api Get test 1", () => {
//   it("should get all todos", done => {
//     chai
//       .request("http://localhost:5001")
//       .get("/todo/api/v1.0/todos")
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a("array");
//         res.body.length.should.be.eql(2); //IT SHOULD THE NUMBER OF TODOS IN YOUR DB
//         done();
//       });
//   });
// });

// describe("Api Get test 2", () => {
//   it("should get a specific todo", done => {
//     chai
//       .request("http://localhost:5001")
//       .get("/todo/api/v1.0/todos/08a5bab7-0937-4dc8-86e7-209f537a4087")
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a("array");
//         res.body.length.should.be.eql(1);
//         done();
//       });
//   });
// });

// describe("Api Post test", () => {
//   it("should add new todo", done => {
//     chai
//       .request("http://localhost:5001")
//       .post("/todo/api/v1.0/todos")
//       .send({
//         title: "New title to be added for test",
//         description: "New descript to be added for test"
//       })
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a("array");
//         res.body[0].should.have
//           .property("message")
//           .eql("Todo updated successfully");
//         res.body[0].should.have.property("status").eql(true);
//         done();
//       });
//   });
// });

// describe("Api Put test", () => {
//   it("should update a todo", done => {
//     chai
//       .request("http://localhost:5001")
//       .put("/todo/api/v1.0/todos/2d0135ac-fac3-46d8-9cb1-eac9213b36c1")
//       .send({
//         title: "Updated title for test1",
//         description: "updated description for test1"
//       })
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a("array");
//         res.body[0].should.have
//           .property("message")
//           .eql("Todo updated successfully");
//         res.body[0].should.have.property("status").eql(true);
//         done();
//       });
//   });
// });

// describe("Api Put test", () => {
//   it("should update a todo", done => {
//     chai
//       .request("http://localhost:5001")
//       .del("/todo/api/v1.0/todos/2d0135ac-fac3-46d8-9cb1-eac9213b36c1")
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a("array");
//         res.body[0].should.have
//           .property("message")
//           .eql("Todo deleted successfully");
//         res.body[0].should.have.property("status").eql(true);
//         done();
//       });
//   });
// });
