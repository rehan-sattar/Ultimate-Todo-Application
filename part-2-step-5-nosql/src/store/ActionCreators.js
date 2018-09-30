
import { Actions } from "./Actions";
import swal from "sweetalert";
import { Observable } from "rxjs";
import { Action } from "rxjs/internal/scheduler/Action";
const API_END_POINT = 'https://nodejs-todo-server.herokuapp.com';
function insertTodoToDatabase({ title, description }) {
    return dispatch => {
        const addTodoObserve$ = Observable.create(observer$ => {
            fetch(`https://nodejs-todo-server.herokuapp.com/todo/api/v1.0/tasks/ `, {
                method: "POST",
                body: JSON.stringify({
                    Title: title,
                    Description: description
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => res.json()).then(data => {
                observer$.next(data['data']);
                observer$.complete();
            }).catch(err => observer$.error(err));
        });
        addTodoObserve$.subscribe(data => {
            console.log(data);
            dispatch({
                type: Actions.addTodoSuccess,
                payload: data
            })
        }, err => dispatch({
            type: Actions.addTodoError,
            err
        }));
    }
}


function deleterTodoFromDatabase(todoId) {
    return dispatch => {
        const deletTodoFromDatabase$ = Observable.create(observer$ => {
            fetch(`https://nodejs-todo-server.herokuapp.com/todo/api/v1.0/tasks/${todoId}`, {
                method: "delete"
            })
                .then(res => res.json())
                .then(data => {
                    observer$.next(data);
                    observer$.complete();
                }).catch(err => observer$.error(err));

        })
        deletTodoFromDatabase$.subscribe(data => {
            console.log(data)
            swal('Wohaamiii!!', 'Your task has been Deleted', 'success');
            dispatch({
                type: Actions.deleteTodoSuccess,
                payload: data.id
            })
        }, err => dispatch({
            type: Actions.deleteTodoError,
            err
        }));
    }

}

function updateTodoInDatabase({ updateDescription,
    updateTitle,
    todoId
}) {
    return dispatch => {
        const updateTodoObservabe$ = Observable.create(observer$ => {
            fetch(`https://nodejs-todo-server.herokuapp.com/todo/api/v1.0/tasks/${todoId}`, {
                method: "PUT",
                body: JSON.stringify({
                    Title: updateTitle,
                    Description: updateDescription
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {
                    observer$.next(data);
                    observer$.complete();
                })
        });
        updateTodoObservabe$.subscribe(data => {
            console.log(data);
            dispatch({
                type: Actions.addTodoSuccess,
                payload: data
            })
        }, err => dispatch({
            type: Actions.addTodoError,
            err
        }));
    }
};

function getAllTodosFromDatabase() {
    return dispatch => {
        const getDataFromDatabase$ = Observable.create(observer$ => {
            fetch(`https://nodejs-todo-server.herokuapp.com/todo/api/v1.0/tasks/`)
                .then(response => response.json())
                .then(data => {
                    observer$.next(data);
                    observer$.complete();
                })
                .catch(err => observer$.error(err));
        });

        getDataFromDatabase$.subscribe(data => dispatch({
            type: Actions.readAllTodoSuccess,
            payload: data
        }), err => dispatch({
            type: Actions.readAllTodoError,
            err,
        }));
    };
};

function taskDoneAttempt(id, status) {
    return dispatch => {
        const taskDone$ = Observable.create(observer$ => {
            fetch(`https://nodejs-todo-server.herokuapp.com/todo/api/v1.0/tasks/${id}/${status}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        observer$.next(data);
                        observer$.complete();
                    }
                })
                .catch(err => observer$.error(err));
        })

        taskDone$.subscribe(data => dispatch({
            type: Actions.updateTodoSuccess,
            payload: data
        }), err => dispatch({
            type: Actions.updateTodoError,
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


