//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Book = require('../src/models/todo');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);

describe('Todos', () => {
	beforeEach((done) => { //Before each test we empty the database
		Book.remove({}, (err) => {
			done();
		});
	});


	describe('/GET todo', () => {
		it('it should GET all the Todos', (done) => {
			chai.request(server)
				.get('/todo/api/v1.0/tasks')
				.end((err, res) => {
					res.should.have.status(200);
					// res.body.should.be.a('array');
					// res.body.length.should.be.eql(0);
					done();
				});
		});
	});
});