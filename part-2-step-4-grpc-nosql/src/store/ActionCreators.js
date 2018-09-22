
import { Actions } from "./Actions";
import store from "./index";
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
                    //    () =>  getAllTodosFromDatabase();
                    // read all from database!
                }
            })
            .catch(err => console.log(err))
    };
};



function deleterTodoFromDatabase(todoId) {
    return dispatch => {
        console.log(todoId);
        fetch(`${API_END_POINT}/todo/api/v1.0/tasks/delete/${todoId}`, {
            method: "delete",

        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
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
            .then(data => console.log(data))
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
            .catch(err => console.log(err))
    };
};


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


