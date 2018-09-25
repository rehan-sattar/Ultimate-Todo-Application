import { Observable } from 'rxjs';
import swal from "sweetalert";
import { Actions } from "./Actions";
const API_END_POINT = 'http://localhost:2000';
function insertTodoToDatabase(todoState) {
    return dispatch => {
        const inserTodoObserver$ = Observable.create(obs => {
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
                                obs.next(data);
                                obs.complete();
                            })
                            .catch(err => obs.error(err))
                    }
                })
                .catch(err => obs.error(err))
        })
        inserTodoObserver$.subscribe(data => {
            swal('Todo added', "Todo has been added!", 'success');
            dispatch({
                type: Actions.readAllTodoSuccess,
                payload: data
            })
        })
    };
};



function deleterTodoFromDatabase(todoId) {
    return dispatch => {

        console.log(todoId);
        const deteTodoObservable$ = Observable.create(obserber => {
            fetch(`${API_END_POINT}/todo/api/v1.0/tasks/delete/${todoId}`, {
                method: "delete",

            })
                .then(res => res.json())
                .then(data => {
                    fetch(`${API_END_POINT}/todo/api/v1.0/tasks`)
                        .then(res => res.json())
                        .then(data => {
                            obserber.next(data);
                            obserber.complete();

                        })
                        .catch(err => obserber.error(err))
                })
                .catch(err => obserber.error(err))

        });

        deteTodoObservable$.subscribe(data => {
            swal('Todo Deleted', "Todo has been Deleted!", 'success');
            dispatch({
                type: Actions.readAllTodoSuccess,
                payload: data
            });
        });
    };
};

function updateTodoInDatabase({ updateDescription,
    updateTitle,
    updateDoneStatus,
    todoId
}) {
    return dispatch => {

        const updateTodoObservable$ = Observable.create(observer$ => {
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
                            observer$.next(data);
                            observer$.complete();

                        })
                        .catch(err => observer$.error(err))
                })
                .catch(err => observer$.error(err))
        });

        updateTodoObservable$.subscribe(data => {
            swal('Todo updated', "Todo has been updated!", 'success');
            dispatch({
                type: Actions.readAllTodoSuccess,
                payload: data
            })
        })

    }
};

function getAllTodosFromDatabase() {
    return dispatch => {
        const getDataFromDatabase$ = Observable.create(observer$ => {
            fetch('https://nodejs-todo-server.herokuapp.com/todo/api/v1.0/tasks/')
                .then(response => response.json())
                .then(data => {
                    observer$.next(data);
                    observer$.complete();
                })
                .catch(err => observer$.error(err));
        });

        getDataFromDatabase$.subscribe(data => dispatch({
            type: 'ALL_TODOS',
            payload: data
        }));
    }
}

function taskDoneAttempt(todo) {
    return dispatch => {
        fetch(``)
            .then()
            .then()
            .catch()
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








// ************* observable for read all ************** 


// ***************** Add a Todo Observable ****************** 

function addTodos({ title, description }) {
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
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === true) {
                        swal('Task Added!', 'Your todo has beed added', 'success');
                        fetch(`https://nodejs-todo-server.herokuapp.com/todo/api/v1.0/tasks/`, {
                            method: 'GET'
                        })
                            .then(res => res.json())
                            .then(data => {
                                observer$.next(data);
                                observer$.complete();
                            });
                    }
                })
                .catch(error => {
                    console.log(error)
                });
        });

        addTodoObserve$.subscribe(data => dispatch({
            type: 'ALL_TODOS',
            payload: data
        }));
    }
}


// +============== Remove Todo rxjs Observable Action ===============+

function removeTodo(id) {
    return dispatch => {
        const deletTodoFromDatabase$ = Observable.create(observer$ => {
            fetch(`https://nodejs-todo-server.herokuapp.com/todo/api/v1.0/tasks/${id}`, {
                method: "delete"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === true) {
                        swal('Task deleted!', 'Your todo has beed deleted', 'success');
                        fetch(`https://nodejs-todo-server.herokuapp.com/todo/api/v1.0/tasks/`, {
                            method: 'GET'
                        })
                            .then(res => res.json())
                            .then(data => {
                                observer$.next(data);
                                observer$.complete();
                            });
                    }
                })
                .catch(err => console.log(err));
        })
        deletTodoFromDatabase$.subscribe(repsonse => dispatch({
            type: 'ALL_TODOS',
            payload: repsonse
        }));
    };
};


// +================== Update Fucntion Observable ===============+ 

function updateFunction({ id, Title, Description }) {
    return dispatch => {
        const todoObject = {
            Title,
            Description
        };

        const updateTodoObservabe$ = Observable.create(observer$ => {
            fetch(`https://nodejs-todo-server.herokuapp.com/todo/api/v1.0/tasks/${id}`, {
                method: "PUT",
                body: JSON.stringify(todoObject),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {
                    swal('Task updated!', 'Your todo has beed updated', 'success');
                    fetch(`https://nodejs-todo-server.herokuapp.com/todo/api/v1.0/tasks/`, {
                        method: 'GET'
                    })
                        .then(res => res.json())
                        .then(data => {
                            observer$.next(data);
                            observer$.complete();
                        });
                })
        })

        updateTodoObservabe$.subscribe(response => dispatch({
            type: 'ALL_TODOS',
            payload: response
        }));
    }
};

function markAsDone(id, status) {
    return dispatch => {

        const markAsDoneObservable$ = Observable.create(observer$ => {
            fetch(`https://nodejs-todo-server.herokuapp.com/todo/api/v1.0/tasks/${id}/${status}`, {
                method: "PUT"
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    swal('Task status Updated!', 'Your todo has beed updated', 'success');

                    fetch(`https://nodejs-todo-server.herokuapp.com/todo/api/v1.0/tasks/`, {
                        method: 'GET'
                    })
                        .then(res => res.json())
                        .then(data => {
                            observer$.next(data);
                            observer$.complete()
                        });
                });
        });

        markAsDoneObservable$.subscribe(res => dispatch({
            type: 'ALL_TODOS',
            payload: res
        }));
    };
};


