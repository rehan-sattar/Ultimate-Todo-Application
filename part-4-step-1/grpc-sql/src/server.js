const PROTO_PATH = __dirname + '../../../protos/todo.proto';
const grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
const { Client } = require('pg')


// gRPC
var packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, enums: String, defaults: true, oneofs: true });
var todoproto = grpc.loadPackageDefinition(packageDefinition).todoproto;
const server = new grpc.Server();


// Postgress
const connectionString = 'postgresql://root:root@localhost:5432/todo'
const db = new Client({
    connectionString: connectionString,
})
db.connect((err) => {
    if (err) throw err;
    console.log('postgres connected')

})

//gRPC Service
server.addService(todoproto.TodoService.service, {

    list: function (_, callback) {

        db.query(`SELECT * FROM Todos`, (err, res) => {
            if (err) throw err;
            callback(null, res)
        })
    },

    insert: function (call, callback) {
        db.query('INSERT INTO Todos (title, description, date) VALUES ($1, $2, $3)', [call.request.title, call.request.description, new Date()], (err) => {
            if (err) throw err;
            callback(null, { status: "success" })
        })
    },

    get: function (call, callback) {
        db.query('SELECT * FROM Todos WHERE id = $1',[call.request.id], (err, res) => {
            if (err) throw err;
            callback(null, res.rows[0])
        })
    },

    update: function (call, callback) {
        db.query('UPDATE Todos SET title = $1, description =$2  WHERE id = $3', [call.request.title, call.request.description, call.request.id], (err) => {
            if (err) throw err;
            callback(null, { status: "success" })
        })
    },

    delete: function (call, callback) {
        db.query('DELETE FROM Todos WHERE id = $1', [call.request.id], (err) => {
            if (err) throw err;
            callback(null, { status: "success" })
        })
    }

});

// gRPC Server
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
console.log('grpc server starting on :', '0.0.0.0:50051');
server.start();
console.log('grpc server running on :', '0.0.0.0:50051');