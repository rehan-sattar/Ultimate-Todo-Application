const grpc = require('grpc');
const proto = grpc.load('todo.proto');
const server = new grpc.Server();

global.Mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/grpctodo';
Mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const todoServices = require('./tododb');

server.addService(proto.todos.TodoService.service, {

    list(call, callback) {
        todoServices.list(callback);
    },

    get(call, callback) {
        let payload = {
            criteria: {
                id: call.request.id
            },
            projections: {
                _id: 0
            }
        };
        let emp = new todoServices(payload);
        emp.fetch(callback);
    },

    add(call, callback) {
        var todo = new todoServices({
            id: call.request.id,
            title: call.request.title,
            description: call.request.description,
        });
        todo.add(callback);
    },

    delete(call, callback) {
        const e = {
            id: call.request.id,
        };
        var todo = new todoServices(e);
        todo.remove(e, callback);
    },
});

server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());

server.start();
console.log('grpc server running on port:', '0.0.0.0:50051');