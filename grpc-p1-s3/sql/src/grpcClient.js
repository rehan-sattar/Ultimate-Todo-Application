const PROTO_PATH = __dirname + '../../../protos/todo.proto';
const grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');

var packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, enums: String, defaults: true, oneofs: true });
var todoproto = grpc.loadPackageDefinition(packageDefinition).todoproto;
// The protoDescriptor object has the full package hierarchy

var client = new todoproto.TodoService('0.0.0.0:50051', grpc.credentials.createInsecure());

function todosList(req, res) {
    client.list({}, function (err, todos) {
        res.send(todos)
    });
}

function insertTodo(req, res) {
    var todo = {
        title: req.body.title,
        description: req.body.description
    };
    client.insert(todo, function (error, empty) {
        res.send(empty)
    });
}

function getTodo(req, res) {
    client.get({
        id: parseInt(req.params.id)
    }, function (err, todo) {
        res.send(todo)
    });
}

function updateTodo(req, res) {
    var todo = {
        id: parseInt(req.params.id),
        title: req.body.title,
        description: req.body.description
    };
    client.update(todo, function (err, empty) {
        res.send(empty)
    });
}

function deleteTodo(req, res) {
    client.delete({ id: parseInt(req.params.id) }, function (err, todo) {
        res.send(todo)
    });
}


// for rest api
module.exports = {
    todosList,
    insertTodo,
    getTodo,
    updateTodo,
    deleteTodo
}