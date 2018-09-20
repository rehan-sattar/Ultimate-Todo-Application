function downloadAllTodos() {
    return dispatch => {
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
    console.log('inside add todo ', title, description)
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
                    dispatch({
                        type: 'TODO_ADDED',
                        payload: data
                    })
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
                    dispatch({
                        type: 'TODO_DELETED',
                        paylod: data
                    })
                }
            })
            .catch(err => console.log(err));
    }

}


function updateFunction({ id, Title, Description }) {
    return disaptch => {
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
                disaptch({
                    type: 'DATA_UPDATED',
                    payload: data
                })
            })
    }
};

function markAsDone(id, status) {
    return dispatch => {
        fetch(`https://nodejs-todo-server.herokuapp.com/todo/api/v1.0/tasks/${id}/${status}`, {
            method: "PUT"
        })
            .then(res => res.json())
            .then(data => console.log(data));
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