
import { Actions } from "./Actions";
import swal from "sweetalert";
const API_END_POINT = 'http://localhost:2000';
function insertTodoToDatabase(todoState) {
    return dispatch => {
        console.log(todoState);
        fetch(`http://localhost:2000/todo/api/v1.0/tasks/add`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: todoState.title,
                description: todoState.description
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    fetch(`${API_END_POINT}/todo/api/v1.0/tasks`)
                        .then(res => res.json())
                        .then(data => {

                            swal('Todo added', "Todo has been added!", 'success');
                            dispatch({
                                type: Actions.readAllTodoSuccess,
                                payload: data
                            })
                        })
                        .catch(err => dispatch({
                            type: Actions.addTodoError,
                            err
                        }))
                }
            })
            .catch(err => dispatch({
                type: Actions.addTodoError,
                err
            }))
    };
};



function deleterTodoFromDatabase(todoId) {
    return dispatch => {
        console.log(todoId);
        fetch(`${API_END_POINT}/todo/api/v1.0/tasks/delete/${todoId}`, {
            method: "delete",

        })
            .then(res => res.json())
            .then(data => {
                fetch(`${API_END_POINT}/todo/api/v1.0/tasks`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)

                        swal('Todo Deleted', "Todo has been Deleted!", 'success');
                        dispatch({
                            type: Actions.readAllTodoSuccess,
                            payload: data
                        })
                    })
                    .catch(err => dispatch({
                        type: Actions.deleteTodoError,
                        err
                    }))
            })
            .catch(err => dispatch({
                type: Actions.deleteTodoError,
                err
            }))
    }
};

function updateTodoInDatabase({ updateDescription,
    updateTitle,
    updateDoneStatus,
    todoId
}) {
    return dispatch => {
        fetch(`${API_END_POINT}/todo/api/v1.0/tasks/edit/${todoId}`, {
            method: 'put',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: updateTitle,
                description: updateDescription
            })

        })
            .then(res => res.json())
            .then(data => {
                fetch(`${API_END_POINT}/todo/api/v1.0/tasks`)
                    .then(res => res.json())
                    .then(data => {
                        
                        swal('Todo updated', "Todo has been updated!", 'success');
                        dispatch({
                            type: Actions.readAllTodoSuccess,
                            payload: data
                        })
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }
};

function getAllTodosFromDatabase() {
    return dispatch => {
        fetch(`${API_END_POINT}/todo/api/v1.0/tasks`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                dispatch({
                    type: Actions.readAllTodoSuccess,
                    payload: data
                })
            })
            .catch(err => dispatch({
                type : Actions.readAllTodoError,
                err
            }))
    };
};



function taskDoneAttempt(todo, status) {
    return dispatch => {
        fetch(`${API_END_POINT}/todo/api/v1.0//tasks/status/edit/${todo}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                done: status
            })
        })
            .then(res => res.json())
            .then(data => {
                fetch(`${API_END_POINT}/todo/api/v1.0/tasks`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        dispatch({
                            type: Actions.readAllTodoSuccess,
                            payload: data
                        })
                    })
            })
            .catch(err => dispatch({
                type: Actions.taskDoneError,
                err
            }))
    };
};


function getSpecificTodo() {

};


export {
    insertTodoToDatabase,
    deleterTodoFromDatabase,
    updateTodoInDatabase,
    getAllTodosFromDatabase,
    getSpecificTodo,
    taskDoneAttempt
};


