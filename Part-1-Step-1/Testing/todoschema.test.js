// const sinon = require('sinon')
const chaiHttp = require("chai-http");
// const mongoose = require("mongoose");
// require("sinon-mongoose");
const chai = require("chai");
const {expect} =chai;
const should =chai.should();
chai.use(chaiHttp);
// const todoSchema = require("../dist/models/todo-model.js");
// const ToDo = mongoose.model("ToDo",todoSchema);

// describe("Get all todos",() => {
//     it("should return all todos",(done) =>{
//         const TodoMock= sinon.mock(ToDo);
//         const expectedResult = {status:true, todo:[]};
//         TodoMock.expects('find').yields(null,expectedResult);
//         ToDo.find((err,result) => {
//                 TodoMock.verify();
//                 TodoMock.restore();
//                 expect(result.status).to.be.true;
//                 done()
//         })
//     })
//     it("should return all todos",(done) =>{
//         const TodoMock= sinon.mock(ToDo);
//         const expectedResult = {status:false, error:"Something went wrong"};
//         TodoMock.expects('find').yields(expectedResult,null);
//         ToDo.find((err,result) => {
//                 TodoMock.verify();
//                 TodoMock.restore();
//                 expect(err.status).to.not.be.true;
//                 done();
//         })
//     })
// })
// describe("Get Specific todos",() => {
//     it("should return single todo",(done) =>{
//         const TodoMock= sinon.mock(ToDo);
//         const expectedResult = {status:true, todo:[]};
//         TodoMock.expects('findById').withArgs({_id: 12345}).yields(null,expectedResult);
//         ToDo.findById({_id: 12345},(err,result) => {
//                 TodoMock.verify();
//                 TodoMock.restore();
//                 expect(result.status).to.be.true;
//                 done()
//         })
//     })
//     it("should return error,should not return single todo",(done) =>{
//         const TodoMock= sinon.mock(ToDo);
//         const expectedResult = {status:false, error:"Something went wrong"};
//         TodoMock.expects('findById').withArgs({_id: 12345}).yields(expectedResult,null);
//         ToDo.findById({_id: 12345},(err,result) => {
//                 TodoMock.verify();
//                 TodoMock.restore();
//                 expect(err.status).to.not.be.true;
//                 done();
//         })
//     })
// })


// describe("Post a new todo", function(){
//     it("should create new post", function(done){
//         var TodoMock = sinon.mock(new ToDo({ todo: 'Save new todo from mock'}));
//         var todo = TodoMock.object;
//         var expectedResult = { status: true };
//         TodoMock.expects('save').yields(null, expectedResult);
//         todo.save(function (err, result) {
//             TodoMock.verify();
//             TodoMock.restore();
//             expect(result.status).to.be.true;
//             done();
//         });
//     });
//     it("should return error, if post not saved", function(done){
//         var TodoMock = sinon.mock(new ToDo({ todo: 'Save new todo from mock'}));
//         var todo = TodoMock.object;
//         var expectedResult = { status: false };
//         TodoMock.expects('save').yields(expectedResult,null);
//         todo.save(function (err, result) {
//             TodoMock.verify();
//             TodoMock.restore();
//             expect(err.status).to.not.be.true;
//             done();
//         });
//     });
//     })

//     // Test will pass if the todo is updated based on an ID
//   describe("Update a new todo by id", function(){
//     it("should updated a todo by id", function(done){
//       var TodoMock = sinon.mock(new ToDo({ completed: true}));
//       var todo = TodoMock.object;
//       var expectedResult = { status: true };
//       TodoMock.expects('save').withArgs({_id: 12345}).yields(null, expectedResult);
//       todo.save({_id: 12345},function (err, result) {
//         TodoMock.verify();
//         TodoMock.restore();
//         expect(result.status).to.be.true;
//         done();
//       });
//     });
//     // Test will pass if the todo is not updated based on an ID
//     it("should return error if update action is failed", function(done){
//       var TodoMock = sinon.mock(new ToDo({ completed: true}));
//       var todo = TodoMock.object;
//       var expectedResult = { status: false };
//       TodoMock.expects('save').withArgs({_id: 12345}).yields(expectedResult, null);
//       todo.save({_id: 12345},function (err, result) {
//         TodoMock.verify();
//         TodoMock.restore();
//         expect(err.status).to.not.be.true;
//         done();
//       });
//     });
//   });

//   // Test will pass if the todo is deleted based on an ID
//   describe("Delete a todo by id", function(){
//     it("should delete a todo by id", function(done){
//         var TodoMock = sinon.mock(ToDo);
//         var expectedResult = { status: true };
//         TodoMock.expects('remove').withArgs({_id: 12345}).yields(null, expectedResult);
//         ToDo.remove({_id: 12345}, function (err, result) {
//             TodoMock.verify();
//             TodoMock.restore();
//             expect(result.status).to.be.true;
//             done();
//         });
//     });
//     // Test will pass if the todo is not deleted based on an ID
//     it("should return error if delete action is failed", function(done){
//         var TodoMock = sinon.mock(ToDo);
//         var expectedResult = { status: false };
//         TodoMock.expects('remove').withArgs({_id: 12345}).yields(expectedResult, null);
//         ToDo.remove({_id: 12345}, function (err, result) {
//             TodoMock.verify();
//             TodoMock.restore();
//             expect(err.status).to.not.be.true;
//             done();
//         });
//     });
// });


//Api Testing

// describe("Api Get test 1", () => {
//     it("should get all todos", done => {
//       chai
//         .request("https://nodejs-todo-server.herokuapp.com")
//         .get("/todo/api/v1.0/tasks")
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a("array");
//           res.body.length.should.be.eql(res.body.length); //IT SHOULD THE NUMBER OF TODOS IN YOUR DB
//           done();
//         });
//     });
//   });
//   describe("Api Get test 2", () => {
//     it("should get a specific todo", done => {
//       chai
//         .request("https://nodejs-todo-server.herokuapp.com")
//         .get("/todo/api/v1.0/tasks/5bace459e395e800159c5a0e")
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a("object");
//         //   res.body.length.should.be.eql(1);
//           done();
//     });
// });
//   });

//   describe("Api Post test", () => {
//     it("should add new todo", done => {
//       chai
//         .request("https://nodejs-todo-server.herokuapp.com")
//         .post("/todo/api/v1.0/tasks")
//         .send({
//           Title: "New title to be added for test",
//           Description: "New descript to be added for test"
//         })
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a("object");
//           res.body.should.have.property("status").eql(true);
//         });
//         done();
//     });
//   });

// describe("Api Put test", () => {
//     it("should update a todo", done => {
//       chai
//         .request("http://localhost:5000")//https://nodejs-todo-server.herokuapp.com
//         .put("/todo/api/v1.0/tasks/5bace7b7e395e800159c5a0f")
//         .send({
//           Title: "Updated title for test1",
//           Description: "updated description for test1"
//         })
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a("object");
//           res.body.should.have
//             .property("Title")
//             .eql("Updated title for test1");
//             res.body.should.have
//             .property("Description")
//             .eql("updated description for test1");
//           done();
//         });
//     });
//   });

// describe("Api Put test", () => {
//     it("Done Status True", done => {
//         chai
//           .request("http://localhost:5000")//https://nodejs-todo-server.herokuapp.com
//           .put("/todo/api/v1.0/tasks/5bace7b7e395e800159c5a0f/true")
//           .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a("object");
//               res.body.should.have
//               .property("Done")
//               .eql(true);
//             done();
//           });
//       });
//       it("Done Status False", done => {
//         chai
//           .request("http://localhost:5000")//https://nodejs-todo-server.herokuapp.com
//           .put("/todo/api/v1.0/tasks/5bace7b7e395e800159c5a0f/false")
//           .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a("object");
//               res.body.should.have
//               .property("Done")
//               .eql(false);
//             done();
//           });
//       });
//       it("Done Invalid Input", done => {
//         chai
//           .request("http://localhost:5000")//https://nodejs-todo-server.herokuapp.com
//           .put("/todo/api/v1.0/tasks/5bace7b7e395e800159c5a0f/null")
//           .end((err, res) => {
//             res.should.have.status(404);
//             res.body.should.be.a("object");
//               res.body.should.have
//               .property("message")
//               .eql("Invalid Done Status");
//             done();
//           });
//       });
//       it("Done Invalid Input", done => {
//         chai
//           .request("http://localhost:5000")//https://nodejs-todo-server.herokuapp.com
//           .put("/todo/api/v1.0/tasks/5bace7b7e395e800159c5a0f/undefined")
//           .end((err, res) => {
//             res.should.have.status(404);
//             res.body.should.be.a("object");
//               res.body.should.have
//               .property("message")
//               .eql("Invalid Done Status");
//             done();
//           });
//       });
//       it("Done Invalid Input", done => {
//         chai
//           .request("http://localhost:5000")//https://nodejs-todo-server.herokuapp.com
//           .put("/todo/api/v1.0/tasks/5bace7b7e395e800159c5a0f/AnyInvalidInput")
//           .end((err, res) => {
//             res.should.have.status(404);
//             res.body.should.be.a("object");
//               res.body.should.have
//               .property("message")
//               .eql("Invalid Done Status");
//             done();
//           });
//       });
//   });

describe("Api Delete Test", () => {
  it("should delete a todo", done => {
    chai
      .request("https://nodejs-todo-server.herokuapp.com")
      .del("/todo/api/v1.0/tasks/5bace859e395e800159c5a12")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have
          .property("status")
          .eql(true);
        done();
      });
  });
  it("should not delete a todo with response {status:false}", done => {
    chai
      .request("https://nodejs-todo-server.herokuapp.com")
      .del("/todo/api/v1.0/tasks/5bace459e395e800159c5a0e879")
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have
          .property("status")
          .eql(false);
        });
        done();
  });
});
