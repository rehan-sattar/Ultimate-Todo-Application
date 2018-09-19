var express = require('express')
var router = express.Router()
var grpcClient = require('..grpcClient')

router.get('/todos', grpcClient.todosList)
router.post('/todos/add', grpcClient.insertTodo)
router.get('/todos/:id', grpcClient.getTodo)
router.put('/todos/edit/:id', grpcClient.updateTodo)
router.delete('/todos/delete/:id', grpcClient.deleteTodo)

module.exports = router   