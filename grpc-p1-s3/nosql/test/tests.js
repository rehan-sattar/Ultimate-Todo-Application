'use strict';

const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));
const app = require('../app'); // Our app

describe('API endpoint /tasks', function () {
  this.timeout(3000); // How long to wait for a response (ms)

  // GET - List all todos
  it('should return all todos', function () {
    return chai.request(app)
      .get('/todo/api/v1.0/tasks')
      .then(function (res) {
        expect(res).to.have.status(200);
      });
  });

  it('should return all todos', function () {
    return chai.request(app)
      .get('/todo/api/v1.0/tasks')
      .then(function (res) {
        expect(res.body).to.be.an('object');
      });
  });


  it('should not add new todo', function () {
    return chai.request(app)
      .post('/todo/api/v1.0/tasks/a')
      .send({
        title: 'Hello'
      })
      .then(function (res) {
        expect(res).to.have.status(404);
      });
  });

});

