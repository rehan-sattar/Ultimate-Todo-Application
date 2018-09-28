const sinon = require('sinon')
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
require("sinon-mongoose");
const chai = require("chai");
const {expect} =chai;
const should =chai.should();
chai.use(chaiHttp);
const todoSchema = require("../dist/models/todo-model.js");
const ToDo = mongoose.model("ToDo",todoSchema);

describe("Get all todos",() => {
    it("should return all todos",(done) =>{
        const TodoMock= sinon.mock(ToDo);
        const expectedResult = {status:true, todo:[]};
        TodoMock.expects('find').yields(null,expectedResult);
        ToDo.find((err,result) => {
                TodoMock.verify();
                TodoMock.restore();
                expect(result.status).to.be.true;
                done()
        })
    })
    it("should return all todos",(done) =>{
        const TodoMock= sinon.mock(ToDo);
        const expectedResult = {status:false, error:"Something went wrong"};
        TodoMock.expects('find').yields(expectedResult,null);
        ToDo.find((err,result) => {
                TodoMock.verify();
                TodoMock.restore();
                expect(err.status).to.not.be.true;
                done();
        })
    })
})
describe("Get Specific todos",() => {
    it("should return single todo",(done) =>{
        const TodoMock= sinon.mock(ToDo);
        const expectedResult = {status:true, todo:[]};
        TodoMock.expects('findById').withArgs({_id: 12345}).yields(null,expectedResult);
        ToDo.findById({_id: 12345},(err,result) => {
                TodoMock.verify();
                TodoMock.restore();
                expect(result.status).to.be.true;
                done()
        })
    })
    it("should return error,should not return single todo",(done) =>{
        const TodoMock= sinon.mock(ToDo);
        const expectedResult = {status:false, error:"Something went wrong"};
        TodoMock.expects('findById').withArgs({_id: 12345}).yields(expectedResult,null);
        ToDo.findById({_id: 12345},(err,result) => {
                TodoMock.verify();
                TodoMock.restore();
                expect(err.status).to.not.be.true;
                done();
        })
    })
})


describe("Post a new todo", function(){
    it("should create new post", function(done){
        var TodoMock = sinon.mock(new ToDo({ todo: 'Save new todo from mock'}));
        var todo = TodoMock.object;
        var expectedResult = { status: true };
        TodoMock.expects('save').yields(null, expectedResult);
        todo.save(function (err, result) {
            TodoMock.verify();
            TodoMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    it("should return error, if post not saved", function(done){
        var TodoMock = sinon.mock(new ToDo({ todo: 'Save new todo from mock'}));
        var todo = TodoMock.object;
        var expectedResult = { status: false };
        TodoMock.expects('save').yields(expectedResult,null);
        todo.save(function (err, result) {
            TodoMock.verify();
            TodoMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
    })

    // Test will pass if the todo is updated based on an ID
  describe("Update a new todo by id", function(){
    it("should updated a todo by id", function(done){
      var TodoMock = sinon.mock(new ToDo({ completed: true}));
      var todo = TodoMock.object;
      var expectedResult = { status: true };
      TodoMock.expects('save').withArgs({_id: 12345}).yields(null, expectedResult);
      todo.save({_id: 12345},function (err, result) {
        TodoMock.verify();
        TodoMock.restore();
        expect(result.status).to.be.true;
        done();
      });
    });
    // Test will pass if the todo is not updated based on an ID
    it("should return error if update action is failed", function(done){
      var TodoMock = sinon.mock(new ToDo({ completed: true}));
      var todo = TodoMock.object;
      var expectedResult = { status: false };
      TodoMock.expects('save').withArgs({_id: 12345}).yields(expectedResult, null);
      todo.save({_id: 12345},function (err, result) {
        TodoMock.verify();
        TodoMock.restore();
        expect(err.status).to.not.be.true;
        done();
      });
    });
  });

//   // Test will pass if the todo is deleted based on an ID
  describe("Delete a todo by id", function(){
    it("should delete a todo by id", function(done){
        var TodoMock = sinon.mock(ToDo);
        var expectedResult = { status: true };
        TodoMock.expects('remove').withArgs({_id: 12345}).yields(null, expectedResult);
        ToDo.remove({_id: 12345}, function (err, result) {
            TodoMock.verify();
            TodoMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    // Test will pass if the todo is not deleted based on an ID
    it("should return error if delete action is failed", function(done){
        var TodoMock = sinon.mock(ToDo);
        var expectedResult = { status: false };
        TodoMock.expects('remove').withArgs({_id: 12345}).yields(expectedResult, null);
        ToDo.remove({_id: 12345}, function (err, result) {
            TodoMock.verify();
            TodoMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});


//Api Testing

describe("Api Get test 1", () => {
    it("should get all todos", done => {
      chai
        .request("https://nodejs-todo-server.herokuapp.com")
        .get("/todo/api/v1.0/tasks")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(res.body.length); //IT SHOULD THE NUMBER OF TODOS IN YOUR DB
          done();
        });
    });
    it("should check if the response is an array", done => {
      chai
        .request("https://nodejs-todo-server.herokuapp.com")
        .get("/todo/api/v1.0/tasks")
        .end((err, res) => {
          res.body.should.be.a("array");
          done();
        });
    });
    it("should generate a server error since api url is not complete", done => {
      chai
        .request("https://nodejs-todo-server.herokuapp.com")
        .get("/todo/api/v1.0")
        .end((err, res) => {
          res.should.have.status("404");
          done();
        });
    });
      it("should a have property title in each object", done => {
        chai
          .request("https://nodejs-todo-server.herokuapp.com")
          .get("/todo/api/v1.0/tasks")
          .end((err, res) => {
            res.body[res.body.length - 1].should.have.property("Title");
            done();
          });
      });
      it("should a have property description in each object", done => {
        chai
          .request("https://nodejs-todo-server.herokuapp.com")
          .get("/todo/api/v1.0/tasks")
          .end((err, res) => {
            res.body[res.body.length - 1].should.have.property("Description");
            done();
          });
      });
      it("should a have property done in each object", done => {
        chai
          .request("https://nodejs-todo-server.herokuapp.com")
          .get("/todo/api/v1.0/tasks")
          .end((err, res) => {
            res.body[res.body.length - 1].should.have.property("Done");
            done();
          });
      });
      it("should a have property createdat in each object", done => {
        chai
          .request("https://nodejs-todo-server.herokuapp.com")
          .get("/todo/api/v1.0/tasks")
          .end((err, res) => {
            for(let i=0;i<res.length;i++)
            res.body[i].should.have.property("CreatedAt");
            done();
          });
      })
      it("should have a unique id", done => {
        chai
          .request("https://nodejs-todo-server.herokuapp.com")
          .get("/todo/api/v1.0/tasks")
          .end((err, res) => {
            for(let i=0;i<res.length;i++)
            res.body[i].should.have.property("_id");
            done();
          });
      })
  });
  describe("Api Get test 2", () => {
    it("should get a specific todo", done => {
      chai
        .request("https://nodejs-todo-server.herokuapp.com")
        .get("/todo/api/v1.0/tasks/5bad682259db591d5886502d")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
        //   res.body.length.should.be.eql(1);
          done();
    });
});
it("should contain the property Title", done => {
    chai
    .request("https://nodejs-todo-server.herokuapp.com")
    .get("/todo/api/v1.0/tasks/5bad682259db591d5886502d")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("Title");
      //   res.body.length.should.be.eql(1);
        done();
  });
});
it("should contain the property Description", done => {
    chai
      .request("https://nodejs-todo-server.herokuapp.com")
      .get("/todo/api/v1.0/tasks/5bad682259db591d5886502d")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("Description");
      //   res.body.length.should.be.eql(1);
        done();
  });
});
it("should contain the property Done", done => {
    chai
    .request("https://nodejs-todo-server.herokuapp.com")
    .get("/todo/api/v1.0/tasks/5bad682259db591d5886502d")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("Done");
      //   res.body.length.should.be.eql(1);
        done();
  });
});
it("should contain the property Created At", done => {
    chai
    .request("https://nodejs-todo-server.herokuapp.com")
    .get("/todo/api/v1.0/tasks/5bad682259db591d5886502d")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("CreatedAt");
      //   res.body.length.should.be.eql(1);
        done();
  });
});
it("If Id does not match to any document,property message exists", done => {
    chai
    .request("https://nodejs-todo-server.herokuapp.com")
    .get("/todo/api/v1.0/tasks/5bad682259db591d5886502d123")
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property("message");
      //   res.body.length.should.be.eql(1);
        done();
  });
});
it("If Id does not match to any document,property message exists with value Record Not Found", done => {
    chai
      .request("https://nodejs-todo-server.herokuapp.com")
      .get("/todo/api/v1.0/tasks/5bad682259db591d5886502d123")
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property("message").eql("Record Not Found");
      //   res.body.length.should.be.eql(1);
        done();
  });
});
  });

  describe("Api Post test", () => {
    it("should add new todo", done => {
      chai
        .request("https://nodejs-todo-server.herokuapp.com")
        .post("/todo/api/v1.0/tasks")
        .send({
          Title: "New title to be added for test",
          Description: "New script to be added for test"
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("status").eql(true);
        });
        done();
    });
    it("should add todo successfull", done => {
        chai
          .request("https://nodejs-todo-server.herokuapp.com")
          .post("/todo/api/v1.0/tasks")
          .send({
            Title: "Title for test",
            Description: "New description"
          })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
      it("should return a response array of object containing status property", done => {
        chai
          .request("https://nodejs-todo-server.herokuapp.com")
          .post("/todo/api/v1.0/tasks")
          .send({
            Title: "Title for test",
            Description: "New description"
          })
          .end((err, res) => {
            res.body.should.have.property("status");
            done();
          });
      });
      it("should return a response array of object containing status property with value true", done => {
        chai
          .request("https://nodejs-todo-server.herokuapp.com")
          .post("/todo/api/v1.0/tasks")
          .send({
            Title: "Title for test",
            Description: "New description"
          })
          .end((err, res) => {
            res.body.should.have.property("status").eql(true);
            done();
          });
      });
      it("should returns internal server error since description is missing", done => {
        chai
          .request("https://nodejs-todo-server.herokuapp.com")
          .post("/todo/api/v1.0/todos")
          .send({
            Title: "Title for test"
          })
          .end((err, res) => {
            res.should.have.status("404");
            done();
          });
      });
      it("should returns internal server error since description is missing", done => {
        chai
          .request("https://nodejs-todo-server.herokuapp.com")
          .post("/todo/api/v1.0/todos")
          .send({
            Description: "Description for test"
          })
          .end((err, res) => {
            res.should.have.status("404");
            done();
          });
      });
       it("should returns internal server error since body is empty", done => {
    chai
      .request("https://nodejs-todo-server.herokuapp.com")
      .post("/todo/api/v1.0/tasks")
      .send({})
      .end((err, res) => {
        res.should.have.status("404");
    });
    done();
  });
      it("should returns server error 404 since api url is not correct", done => {
        chai
          .request("https://nodejs-todo-server.herokuapp.com")
          .post("/todo/api2/v1.0/tasks")
          .send({})
          .end((err, res) => {
            res.should.have.status("404"); // Means api not found
            done();
          });
      });
  });

describe("Api Put test", () => {
    it("should update the todo successfully", done => {
        chai
          .request("https://nodejs-todo-server.herokuapp.com")
          //THE ID HERE MAY CHANGE IN FUTURE
          .put("/todo/api/v1.0/tasks/82e0bb0a-a9d0-4f8f-abd7-b18ed5abd51d")
          .send({
            Title: "Title for test",
            Description: "New description"
          })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
      it("should have response as an object", done => {
        chai
        .request("https://nodejs-todo-server.herokuapp.com")
        //THE ID HERE MAY CHANGE IN FUTURE
        .put("/todo/api/v1.0/tasks/82e0bb0a-a9d0-4f8f-abd7-b18ed5abd51d")
          .send({
            title: "Title for test",
            description: "New description"
          })
          .end((err, res) => {
            res.body.should.be.a("object");
            done();
          });
      });
      it("should return a response object containing id Property", done => {
        chai
        .request("https://nodejs-todo-server.herokuapp.com")
        //THE ID HERE MAY CHANGE IN FUTURE
        .put("/todo/api/v1.0/tasks/82e0bb0a-a9d0-4f8f-abd7-b18ed5abd51d")
          .send({
            Title: "Title for test",
            Description: "New description"
          })
          .end((err, res) => {
            res.body.should.have
              .property("id")
              .eql("82e0bb0a-a9d0-4f8f-abd7-b18ed5abd51d");
            done();
          });
      });
      it("should return a response  object containing title Property", done => {
        chai
        .request("https://nodejs-todo-server.herokuapp.com")
        //THE ID HERE MAY CHANGE IN FUTURE
        .put("/todo/api/v1.0/tasks/82e0bb0a-a9d0-4f8f-abd7-b18ed5abd51d")
          .send({
            Title: "Title for test",
            Description: "New description"
          })
          .end((err, res) => {
            res.body.should.have
              .property("Title")
              .eql("Title for test");
            done();
          });
      });
      it("should return a response  object containing description Property", done => {
        chai
        .request("https://nodejs-todo-server.herokuapp.com")
        //THE ID HERE MAY CHANGE IN FUTURE
        .put("/todo/api/v1.0/tasks/82e0bb0a-a9d0-4f8f-abd7-b18ed5abd51d")
          .send({
            Title: "Title for test",
            Description: "New description"
          })
          .end((err, res) => {
            res.body.should.have
              .property("Description")
              .eql("New description");
            done();
          });
      });
      it("should return a response  object containing done Property", done => {
        chai
        .request("https://nodejs-todo-server.herokuapp.com")
        //THE ID HERE MAY CHANGE IN FUTURE
        .put("/todo/api/v1.0/tasks/82e0bb0a-a9d0-4f8f-abd7-b18ed5abd51d")
          .send({
            Title: "Title for test",
            Description: "New description"
          })
          .end((err, res) => {
            res.body.should.have
              .property("Done")
              
            done();
          });
      })
      it("should return a response  object containing created at Property", done => {
        chai
        .request("https://nodejs-todo-server.herokuapp.com")
        //THE ID HERE MAY CHANGE IN FUTURE
        .put("/todo/api/v1.0/tasks/82e0bb0a-a9d0-4f8f-abd7-b18ed5abd51d")
          .send({
            Title: "Title for test",
            Description: "New description"
          })
          .end((err, res) => {
            res.body.should.have
              .property("CreatedAt")
            done();
          });
      })
      it("should return message property when id is not matched", done => {
        chai
        .request("https://nodejs-todo-server.herokuapp.com")
        //THE ID HERE MAY CHANGE IN FUTURE
        .put("/todo/api/v1.0/tasks/82e0bb0a-a9d0-4f8f-abd7-b18ed5abd51d")
          .send({
            Title: "Title for test",
            Description: "New description"
          })
          .end((err, res) => {
            res.body.should.have
              .property("message")
            done();
          });
      })
      it("should return message property when id is not matched", done => {
        chai
        .request("https://nodejs-todo-server.herokuapp.com")
        //THE ID HERE MAY CHANGE IN FUTURE
        .put("/todo/api/v1.0/tasks/82e0bb0a-a9d0-4f8f-abd7-b18ed5abd51d")
          .send({
            Title: "Title for test",
            Description: "New description"
          })
          .end((err, res) => {
            res.body.should.have
              .property("message").eql("Record Not Found")
            done();
          });
      })
      it("should returns server error 404 since id is missing", done => {
        chai
        .request("https://nodejs-todo-server.herokuapp.com")
        //THE ID HERE MAY CHANGE IN FUTURE
        .put("/todo/api/v1.0/tasks/")
          .send({
            Title: "Title for test",
            Description : "Description"
          })
          .end((err, res) => {
            res.should.have.status("404"); // Means api not found
            done();
          });
      });
  });

describe("Api Put Done Status test", () => {
    it("Done Status True", done => {
        chai
          .request("https://nodejs-todo-server.herokuapp.com")//https://nodejs-todo-server.herokuapp.com
          .put("/todo/api/v1.0/tasks/5bace7b7e395e800159c5a0f/true")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
              res.body.should.have
              .property("Done")
              .eql(true);
            done();
          });
      });
      it("Done Status False", done => {
        chai
          .request("https://nodejs-todo-server.herokuapp.com")//https://nodejs-todo-server.herokuapp.com
          .put("/todo/api/v1.0/tasks/5bace7b7e395e800159c5a0f/false")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
              res.body.should.have
              .property("Done")
              .eql(false);
            done();
          });
      });
      it("Done Invalid Input", done => {
        chai
          .request("https://nodejs-todo-server.herokuapp.com")//https://nodejs-todo-server.herokuapp.com
          .put("/todo/api/v1.0/tasks/5bace7b7e395e800159c5a0f/null")
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a("object");
              res.body.should.have
              .property("message")
              .eql("Invalid Done Status");
            done();
          });
      });
      it("Done Invalid Input", done => {
        chai
          .request("https://nodejs-todo-server.herokuapp.com") //https://nodejs-todo-server.herokuapp.com
          .put("/todo/api/v1.0/tasks/5bace7b7e395e800159c5a0f/undefined")
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a("object");
              res.body.should.have
              .property("message")
              .eql("Invalid Done Status");
            done();
          });
      });
      it("Done Invalid Input", done => {
        chai
          .request("https://nodejs-todo-server.herokuapp.com")//https://nodejs-todo-server.herokuapp.com
          .put("/todo/api/v1.0/tasks/5bace7b7e395e800159c5a0f/AnyInvalidInput")
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a("object");
              res.body.should.have
              .property("message")
              .eql("Invalid Done Status");
            done();
          });
      });
  });

describe("Api Delete Test", () => {
  it("should delete a todo", done => {
    chai
    .request("https://nodejs-todo-server.herokuapp.com")
    .del("/todo/api/v1.0/tasks/5bad682259db591d5886502d")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
  it("should delete a todo havind status property in respoonse", done => {
    chai
    .request("https://nodejs-todo-server.herokuapp.com")
    .del("/todo/api/v1.0/tasks/5bad682259db591d5886502d")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("status")
        done();
      });
  });
  it("should delete a todo", done => {
    chai
    .request("https://nodejs-todo-server.herokuapp.com")
    .del("/todo/api/v1.0/tasks/5bad682259db591d5886502d")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("status").eql(true)
        done();
      });
  });
  it("should not delete a todo with response {status:false}", done => {
    chai
    .request("https://nodejs-todo-server.herokuapp.com")
    .del("/todo/api/v1.0/tasks/5bad682259db591d5886502d")
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have
          .property("status")
          .eql(false);
        });
        done();
  });
  it("should returns internal server error since id is missing", done => {
    chai
    .request("https://nodejs-todo-server.herokuapp.com")
    .del("/todo/api/v1.0/tasks/")//ID
      .end((err, res) => {
        res.should.have.status("404");
        done();
      });
  });
  it("should returns not found error since url is wrong", done => {
    chai
    .request("https://nodejs-todo-server.herokuapp.com")
    .del("/todo/api/v2.0/tasks/5bad682259db591d5886502d")//ID
      .end((err, res) => {
        res.should.have.status("404");
        done();
      });
  });
});
