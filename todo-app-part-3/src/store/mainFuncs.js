"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var firebase_1 = require("../firebase");
// @ts-check
var Actions_1 = require("./Actions");
var index_1 = require("./index");
function insertTodoToFireStore(todoState) {
    return function (dispatch) {
        firebase_1.fireStore.collection('todos').add(todoState)
            .then(function (snapshot) { return dispatch({
            type: Actions_1.Actions.addTodoSuccess
        }); })["catch"](function (err) {
            dispatch({
                type: Actions_1.Actions.addTodoError,
                err: err
            });
        });
    };
}
exports.insertTodoToFireStore = insertTodoToFireStore;
;
firebase_1.fireStore.collection('todos').onSnapshot(function (snapshot) {
    var todoArray = [];
    snapshot.forEach(function (doc) {
        todoArray.push(__assign({ id: doc.id }, doc.data()));
    });
    index_1["default"].dispatch({
        type: Actions_1.Actions.readAllTodoSuccess,
        payload: todoArray
    });
});
function deleterTodoFromFireStore(todoId) {
    return function (dispatch) {
        firebase_1.fireStore.collection('todos').doc(todoId)["delete"]()
            .then(function () { return dispatch({
            type: Actions_1.Actions.deleteTodoSuccess
        }); })["catch"](function (err) { return dispatch({
            type: Actions_1.Actions.deleteTodoError,
            err: err
        }); });
    };
}
exports.deleterTodoFromFireStore = deleterTodoFromFireStore;
;
function updateTodoInFireStore(_a) {
    var updateDescription = _a.updateDescription, updateTitle = _a.updateTitle, updateDoneStatus = _a.updateDoneStatus, todoId = _a.todoId;
    return function (dispatch) {
        firebase_1.fireStore.collection('todos').doc(todoId).update({
            title: updateTitle,
            description: updateDescription,
            doneStatus: updateDoneStatus
        })
            .then(function () { return dispatch({
            type: Actions_1.Actions.updateTodoSuccess
        }); })["catch"](function (err) { return dispatch({
            type: Actions_1.Actions.updateTodoError,
            err: err
        }); });
    };
}
exports.updateTodoInFireStore = updateTodoInFireStore;
;
function getAllTodosFromFireStore() {
    var allTodos = [];
    return function (dispatch) {
        firebase_1.fireStore.collection('todos').get()
            .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) { return allTodos.push(__assign({ id: doc.id }, doc.data())); });
            dispatch({
                type: Actions_1.Actions.readAllTodoSuccess,
                payload: allTodos
            });
        })["catch"](function (err) { return dispatch({
            type: Actions_1.Actions.readAllTodoError,
            err: err
        }); });
    };
}
exports.getAllTodosFromFireStore = getAllTodosFromFireStore;
;
function getSpecificTodo() {
}
exports.getSpecificTodo = getSpecificTodo;
;
