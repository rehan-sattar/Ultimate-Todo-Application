var express = require('express')
var router = express.Router()
var grpcClient = require('../grpcClient')

router.get('/tasks', grpcClient.todosList)
router.post('/tasks/add', grpcClient.insertTodo)
router.get('/tasks/:id', grpcClient.getTodo)
router.put('/tasks/edit/:id', grpcClient.updateTodo)
router.delete('/tasks/delete/:id', grpcClient.deleteTodo)
router.put('/tasks/status/edit/:id', grpcClient.updateStatus)


module.exports = router   