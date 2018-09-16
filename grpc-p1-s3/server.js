
const grpc = require('grpc');
const protoTodos = grpc.load('todo.proto');
const server = new grpc.Server();

// global.Mongoose = require('mongoose');
// var mongoDB = 'mongodb://localhost/grpctodo';
// Mongoose.Promise = global.Promise;
// Mongoose.connect(mongoDB, { useNewUrlParser: true })
//     .then(() => console.log('Mongodb connection succesful'))
//     .catch((err) => console.error(err));
// const TodoDb = require('./tododb');

var todos = [{
    id: 12,
    title: 'Ultimate Todo App',
    description: 'Ultimate Todo App Projects assigned by Sir Zia Khan and Team'
}];

server.addService(protoTodos.todoproto.TodoService.service, {

    list: function(_, callback) {
        callback(null, todos);
    },

    get: function(call, callback) {
        for (var i = 0; i < todos.length; i++)
            if (todos[i].id == call.request.id)
                return callback(null, todos[i]);
        callback({
            code: grpc.status.NOT_FOUND,
            details: 'Not found'
        });
    },


    insert: function(call, callback) {
        var todo = call.request;
        todos.push(todo);
        callback(null, {});
    },

    delete: function(call, callback) {
        for (var i = 0; i < todos.length; i++) {
            if (todos[i].id == call.request.id) {
                todos.splice(i, 1);
                return callback(null, {});
            }
        }
        callback({
            code: grpc.status.NOT_FOUND,
            details: 'Not found'
        });
    },
});

// gRPC Server
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
console.log('grpc server starting on :', '0.0.0.0:50051');
server.start();
console.log('grpc server running on :', '0.0.0.0:50051');