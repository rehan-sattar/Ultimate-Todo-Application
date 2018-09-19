var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('todo.db')

const PROTO_PATH = __dirname + '../../protos/todo.proto';
const grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');

var packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, enums: String, defaults: true, oneofs: true });
var todoproto = grpc.loadPackageDefinition(packageDefinition).todoproto;
const server = new grpc.Server();

server.addService(todoproto.TodoService.service, {

    list: function (_, callback) {
        db.all(`SELECT * FROM Todos`, (err, rows) => {
            callback(null, rows)
        });
    },

    insert: function (call, callback) {
        db.all(`INSERT INTO Todos (title, description) VALUES ("${call.request.title}", "${call.request.description}")`, (err) => {
            if (!err) {
                callback(null, { status: "success" })
            } else {
                callback(null, { status: "failed" })
            }
        })
    },

    get: function (call, callback) {
        db.all(`SELECT * FROM Todos WHERE id = "${call.request.id}"`, (err, row) => {
            var todo = {
                id: row[0].id,
                title: row[0].name,
                description: row[0].address
            }
            callback(null, todo)
        })
    }

});

// gRPC Server
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
console.log('grpc server starting on :', '0.0.0.0:50051');
server.start();
console.log('grpc server running on :', '0.0.0.0:50051');