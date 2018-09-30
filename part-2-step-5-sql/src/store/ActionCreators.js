import { Actions } from "./Actions";
import swal from "sweetalert";
import { Observable } from "rxjs";
const API_END_POINT = "https://ultimate-todo-web-postgres.herokuapp.com";
function insertTodoToDatabase({ title, description }) {
  return dispatch => {
    const addTodoObserve$ = Observable.create(observer$ => {
      console.log(title, description)
      fetch(`${API_END_POINT}/todo/api/v1.0/todos`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title,
          description: description
        })
      }).then(res => res.json()).then(data => {
        observer$.next(data);
        observer$.complete();
      }).catch(err => observer$.error(err));
    });
    addTodoObserve$.subscribe(data => {
      console.log(data);
      dispatch({
        type: Actions.addTodoSuccess,
        payload: data[1]
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
      fetch(`${API_END_POINT}/todo/api/v1.0/todos/${todoId}`, {
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
        payload: data[0]["id"]
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
          observer$.next(data);
          observer$.complete();
        })
    });
    updateTodoObservabe$.subscribe(data => {
      console.log(data);
      dispatch({
        type: Actions.addTodoSuccess,
        payload: data[0]
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
      fetch(`${API_END_POINT}/todo/api/v1.0/todos`)
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

function taskDoneAttempt(todo, status) {
  return dispatch => {
    console.log(todo, status)
    const taskDoneObserver$ = Observable.create(observer$ => {
      fetch(`${API_END_POINT}/todo/api/v1.0/todos/done/${todo}`, {
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
          observer$.next(data);
          observer$.complete();
        })
        .catch(err => observer$.error(err))
    });

    taskDoneObserver$.subscribe(data => dispatch({
      type: Actions.updateTodoSuccess,
      payload: data[0]
    }), err => dispatch({
      type: Actions.updateTodoError,
      err
    }))
  };
};


export {
  insertTodoToDatabase,
  deleterTodoFromDatabase,
  updateTodoInDatabase,
  getAllTodosFromDatabase,
  taskDoneAttempt
};
