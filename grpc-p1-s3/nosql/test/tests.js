'use strict';

const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));
const app = require('../app'); // Our app



//start 
describe('API endpoint /todo/api/v1.0/tasks', function () {
  this.timeout(3000); // How long to wait for a response (ms)

  // GET - List all todos
  it('should return all todos', function () {
    return chai.request(app)
      .get('/todo/api/v1.0/tasks')
      .then(function (res) {
        expect(res).to.have.status(200);
      });
  });

  it('should not return all todos', function () {
    return chai.request(app)
      .get('/todo/api/v1.0/task')
      .then(function (res) {
        expect(res).to.have.status(404);
      });
  });

  it('should return all todos as object', function () {
    return chai.request(app)
      .get('/todo/api/v1.0/tasks')
      .then(function (res) {
        expect(res.body).to.be.an('object');
      });
  });

});

describe('API endpoint /todo/api/v1.0/tasks/add', function () {
  this.timeout(3000); // How long to wait for a response (ms)

  it('should not add new todo title only', function () {
    return chai.request(app)
      .post('/todo/api/v1.0/tasks/a')
      .send({
        title: 'Hello'
      })
      .then(function (res) {
        expect(res).to.have.status(404);
      });
  });

  it('should not add new todo with description only', function () {
    return chai.request(app)
      .post('/todo/api/v1.0/tasks/a')
      .send({
        description: 'World'
      })
      .then(function (res) {
        expect(res).to.have.status(404);
      });
  });

  it('should not add new todo with no value', function () {
    return chai.request(app)
      .post('/todo/api/v1.0/tasks/a')
      .send({
      })
      .then(function (res) {
        expect(res).to.have.status(404);
      });
  });

  it('should not add new todo with extra value', function () {
    return chai.request(app)
      .post('/todo/api/v1.0/tasks/a')
      .send({
        title: 'Hello',
        description: 'World',
        extra: 'extra'
      })
      .then(function (res) {
        expect(res).to.have.status(404);
      });
  });

});

describe('API endpoint /todo/api/v1.0/tasks/update', function () {
  this.timeout(3000); // How long to wait for a response (ms)

  it('should not update todo with wrong id', function () {
    return chai.request(app)
    .post('/todo/api/v1.0/tasks/update/')
      .send({
        id: 122652222222222222222,
      })
      .then(function (res) {
        expect(res).to.have.status(404);
      });
  });

  it('should not update todo with wrong path', function () {
    return chai.request(app)
    .post('/todo/api/v1.0/tasks/upd')
      .send({
      })
      .then(function (res) {
        expect(res).to.have.status(404);
      });
  });

});


describe('API endpoint /todo/api/v1.0/tasks/delete', function () {
  this.timeout(3000); // How long to wait for a response (ms)

  it('should not delete todo with wrong id', function () {
    return chai.request(app)
      .post('/todo/api/v1.0/tasks/delete/')
      .send({
        id: 122652222222222222222,
      })
      .then(function (res) {
        expect(res).to.have.status(404);
      });
  });

  it('should not delete todo with wrong path', function () {
    return chai.request(app)
      .post('/todo/api/v1.0/tasks/del/')
      .send({
      })
      .then(function (res) {
        expect(res).to.have.status(404);
      });
  });

});

describe("It should Get Value by Each property 1", () => {

  it('should a have property done in each object', function () {
    return chai.request(app)
      .get("/todo/api/v1.0/todos")
      .end((err, res) => {
        res.body[res.body.length - 1].should.have.property("id");
      });
  });

  it('should a have property done in each object', function () {
    return chai.request(app)  
      .get("/todo/api/v1.0/todos")
      .end((err, res) => {
        res.body[res.body.length - 1].should.have.property("title");
      });
  });

  it('should a have property done in each object', function () {
    return chai.request(app)
      .get("/todo/api/v1.0/todos")
      .end((err, res) => {
        res.body[res.body.length - 1].should.have.property("description");
      });
  });

  it('should a have property done in each object', function () {
    return chai.request(app)
      .get("/todo/api/v1.0/todos")
      .end((err, res) => {
        res.body[res.body.length - 1].should.have.property("done");
      });
  });

  it('should a have property done in each object', function () {
    return chai.request(app)
      .get("/todo/api/v1.0/todos")
      .end((err, res) => {
        res.body[res.body.length - 1].should.have.property("date");
      });
  });

});
