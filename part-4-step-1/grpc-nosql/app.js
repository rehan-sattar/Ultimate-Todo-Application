

const PROTO_PATH = __dirname + '../../protos/todo.proto';
const grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH, {
        keepCase: true, enums: String, defaults: true, arrays: true, objects: true, oneofs: true
    });
var todoproto = grpc.loadPackageDefinition(packageDefinition).todoproto;
// The protoDescriptor object has the full package hierarchy

var client = new todoproto.TodoService('0.0.0.0:50051', grpc.credentials.createInsecure());

/* initiate express app */
var express = require('express')
var app = express()
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

/* initiate router */
var TodoRouter = require('./src/router/api')


app.use('/todo/api/v1.0', TodoRouter)

app.listen(2000, () => {
    console.log("server starts port 2000")
})




