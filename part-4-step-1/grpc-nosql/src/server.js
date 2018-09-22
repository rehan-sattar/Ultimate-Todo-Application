
const PROTO_PATH = __dirname + '../../../protos/todo.proto';
const grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');

var packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, enums: String, defaults: true, oneofs: true });
var todoproto = grpc.loadPackageDefinition(packageDefinition).todoproto;
const server = new grpc.Server();

global.Mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/todo';
Mongoose.Promise = global.Promise;
Mongoose.connect(mongoDB, { useNewUrlParser: true })
    .then(() => console.log('Mongodb connection succesful'))
    .catch((err) => console.error(err));
Mongoose.set('useCreateIndex', true);
const TodoDb = require('./tododb');

// static code works without database
// var todos = [{
//     id: 0,
//     title: 'Ultimate Todo App',
//     description: 'Ultimate Todo App Projects assigned by Sir Zia Khan and Team'
// }];

server.addService(todoproto.TodoService.service, {

    list: function (_, callback) {
        TodoDb.list(callback);
        // static code works without database
        // callback(null, todos);
    },

    get: function (call, callback) {
        var payload = {
            condition: {
                id: call.request.id
            },
        };
        var t = new TodoDb(payload);
        t.get(callback);

        // static code works without database
        // for (var i = 0; i < todos.length; i++)
        //     if (todos[i].id == call.request.id)
        //         return callback(null, todos[i]);
        // callback({
        //     code: grpc.status.NOT_FOUND,
        //     details: 'Not found'
        // });
    },


    insert: function (call, callback) {
        var t = new TodoDb({
            id: call.request.id,
            title: call.request.title,
            description: call.request.description,
        });
        t.insert(callback);

        // static code works without database
        // var todo = call.request;
        // todos.push(todo);
        // callback(null, {});
    },

    update: function (call, callback) {
        var payload = {
            condition: {
                id: call.request.id,
            },
            update: {
                id: call.request.id,
                title: call.request.title,
                description: call.request.description,
            }
        };
        var t = new TodoDb(payload);
        t.update(callback);

        // static code works without database
        // var todo = call.request;
        // todos.push(todo);
        // callback(null, {});
    },

    delete: function (call, callback) {
        var payload = {
            condition: {
                id: call.request.id
            }
        };
        var t = new TodoDb(payload);
        t.delete(callback);

        // static code works without database
        // for (var i = 0; i < todos.length; i++) {
        //     if (todos[i].id == call.request.id) {
        //         todos.splice(i, 1);
        //         return callback(null, {});
        //     }
        // }
        // callback({
        //     code: grpc.status.NOT_FOUND,
        //     details: 'Not found'
        // });
    },
});

// gRPC Server
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
console.log('grpc server starting on :', '0.0.0.0:50051');
server.start();
console.log('grpc server running on :', '0.0.0.0:50051');