import { Observable } from 'rxjs';
import swal from "sweetalert";
// ************* observable for read all ************** 
function downloadAllTodos() {
    return dispatch => {
        const getDataFromDatabase$ = Observable.create(observer$ => {
            fetch('https://nodejs-todo-server.herokuapp.com/todo/api/v1.0/tasks/')
                .then(response => response.json()) // or text() or blob() etc.
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
                }
                )
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


// + ============= get a specific Todo =============+

// function getSpecificTask(id) {
//     console.log(id);
//     fetch(`${apiEndPoint.link}`, {
//         method: "GET"
//     })
//         .then(res => res.json())
//         .then(data => console.log(data))
//         .catch(err => console.log(err))
// }


export {
    addTodos,
    downloadAllTodos,
    updateFunction,
    removeTodo,
    markAsDone
};