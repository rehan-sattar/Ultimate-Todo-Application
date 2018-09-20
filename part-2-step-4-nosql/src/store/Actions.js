import swal from "sweetalert";
function downloadAllTodos() {
    return dispatch => {
        console.log('triggered');
        fetch(`https://nodejs-todo-server.herokuapp.com/todo/api/v1.0/tasks/`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: 'ALL_TODOS',
                    payload: data
                })

            });
    }
}
function addTodos({ title, description }) {
    return dispatch => {
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
                if (data.status == true) {
                    swal('Task Added!', 'Your todo has beed added', 'success');
                    fetch(`https://nodejs-todo-server.herokuapp.com/todo/api/v1.0/tasks/`, {
                        method: 'GET'
                    })
                        .then(res => res.json())
                        .then(data => {
                            dispatch({
                                type: 'ALL_TODOS',
                                payload: data
                            })
                        });
                    // downloadAllTodos();
                }
            })
            .catch(error => {
                console.log(error)
            });
    }
}

function removeTodo(id) {
    return dispatch => {
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
                            dispatch({
                                type: 'ALL_TODOS',
                                payload: data
                            })
                        });
                    // downloadAllTodos();
                }
            }
            )
            .catch(err => console.log(err));
    }

}


function updateFunction({ id, Title, Description }) {
    return dispatch => {
        const todoObject = {
            Title,
            Description
        };
        console.log(todoObject);
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
                        dispatch({
                            type: 'ALL_TODOS',
                            payload: data
                        })
                    });
            }
            )
    }
};

function markAsDone(id, status) {
    console.log(id, status);
    return dispatch => {
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
                        dispatch({
                            type: 'ALL_TODOS',
                            payload: data
                        })
                    });
            });
    }
}


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