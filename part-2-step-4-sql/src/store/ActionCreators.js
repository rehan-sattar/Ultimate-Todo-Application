import { Actions } from "./Actions";
import swal from "sweetalert";
const API_END_POINT = "https://ultimate-todo-web-postgres.herokuapp.com";
function insertTodoToDatabase(todoState) {
  return dispatch => {
    console.log(todoState);
    fetch(`${API_END_POINT}/todo/api/v1.0/todos`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: todoState.title,
        description: todoState.description
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data) {
          dispatch({
            type: Actions.addTodoSuccess,
            payload: data[1]
          });
        }
      })
      .catch(err =>
        dispatch({
          type: Actions.addTodoError,
          err
        })
      );
  };
}

function deleterTodoFromDatabase(todoId) {
  return dispatch => {
    console.log(todoId);
    fetch(`${API_END_POINT}/todo/api/v1.0/todos/${todoId}`, {
      method: "delete"
    })
      .then(res => res.json())
      .then(data => {
        swal("Task deleted", "Your Task has been deleted", "success");
        dispatch({
          type: Actions.deleteTodoSuccess,
          payload: data[0]["id"]
        });
      })
      .catch(err =>
        dispatch({
          type: Actions.deleteTodoError,
          err
        })
      );
  };
}

function updateTodoInDatabase({
  updateDescription,
  updateTitle,
  updateDoneStatus,
  todoId
}) {
  return dispatch => {
    fetch(`${API_END_POINT}/todo/api/v1.0/todos/${todoId}`, {
      method: "put",
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
        if (data[0]) {
          dispatch({
            type: Actions.updateTodoSuccess,
            payload: data[0]
          });
        }
      })
      .catch(err =>
        dispatch({
          type: Actions.updateTodoError,
          err
        })
      );
  };
}

function getAllTodosFromDatabase() {
  return dispatch => {
    fetch(`${API_END_POINT}/todo/api/v1.0/todos`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        dispatch({
          type: Actions.readAllTodoSuccess,
          payload: data
        });
      })
      .catch(err =>
        dispatch({
          type: Actions.readAllTodoError,
          err
        })
      );
  };
}

function taskDoneAttempt(todoId, status) {
  return dispatch => {
    console.log("taskDoneAttempt*****", todoId, status);
    fetch(`${API_END_POINT}/todo/api/v1.0/todos/done/${todoId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        done: status
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data[0]) {
          dispatch({
            type: Actions.taskDoneSuccess,
            payload: data[0]
          });
        }
      })
      .catch(err => {
        dispatch({
          type: Actions.taskDoneError,
          err
        });
      });
  };
}

function getSpecificTodo() {}

export {
  insertTodoToDatabase,
  deleterTodoFromDatabase,
  updateTodoInDatabase,
  getAllTodosFromDatabase,
  getSpecificTodo,
  taskDoneAttempt
};
