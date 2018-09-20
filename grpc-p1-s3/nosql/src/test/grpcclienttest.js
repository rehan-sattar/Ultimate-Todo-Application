
const PROTO_PATH = __dirname + '../../../protos/todo.proto';
const grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH, {
        keepCase: true, enums: String, defaults: true, arrays: true, objects: true, oneofs: true
    });
var todoproto = grpc.loadPackageDefinition(packageDefinition).todoproto;
// The protoDescriptor object has the full package hierarchy

var client = new todoproto.TodoService('0.0.0.0:50051', grpc.credentials.createInsecure());

function printResponse(error, response) {
    if (error)
        console.log('Error: ', error);
    else
        console.log(response);
}

function todosList() {
    client.list({}, function (error, todos) {
        printResponse(error, todos);
    });
}

function insertTodo(id, title, description) {
    var todo = {
        id: parseInt(id),
        title: title,
        description: description
    };
    client.insert(todo, function (error, empty) {
        printResponse(error, empty);
    });
}

function updateTodo(id, title, description) {
    var todo = {
        id: parseInt(id),
        title: title,
        description: description
    };
    client.update(todo, function (error, todo) {
        printResponse(error, todo);
    });
}

function getTodo(id) {
    client.get({
        id: parseInt(id)
    }, function (error, todo) {
        printResponse(error, todo);
    });
}

function deleteTodo(id) {
    client.delete({
        id: parseInt(id)
    }, function (error, empty) {
        printResponse(error, empty);
    });
}

//command line testing of gRPC service
var processName = process.argv.shift();
var scriptName = process.argv.shift();
var command = process.argv.shift();

if (command == 'list')
    todosList();
else if (command == 'insert')
    insertTodo(process.argv[0], process.argv[1], process.argv[2]);
else if (command == 'get')
    getTodo(process.argv[0]);
else if (command == 'update')
    updateTodo(process.argv[0], process.argv[1], process.argv[2]);
else if (command == 'delete')
    deleteTodo(process.argv[0]);
