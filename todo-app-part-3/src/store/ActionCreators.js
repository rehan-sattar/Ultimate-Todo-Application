
import { fireStore } from "../firebase";
import { Actions } from "./Actions";
import store from "./index";
function insertTodoToFireStore(todoState) {
    return dispatch => {
        fireStore.collection('todos').add(todoState)
            .then(snapshot => dispatch({
                type: Actions.addTodoSuccess,
            }))
            .catch(err => {
                dispatch({
                    type: Actions.addTodoError,
                    err,
                })
            })
    };
};

fireStore.collection('todos').onSnapshot(snapshot => {
    let todoArray = [];
    snapshot.forEach(doc => {
        todoArray.push({ id: doc.id, ...doc.data() });
    })
    store.dispatch({
        type: Actions.readAllTodoSuccess,
        payload: todoArray
    })
});

function deleterTodoFromFireStore(todoId) {
    return dispatch => {
        fireStore.collection('todos').doc(todoId).delete()
            .then(() => dispatch({
                type: Actions.deleteTodoSuccess,
            }))
            .catch(err => dispatch({
                type: Actions.deleteTodoError,
                err
            }))
    }
};

function updateTodoInFireStore({ updateDescription,
    updateTitle,
    updateDoneStatus,
    todoId
}) {
    return dispatch => {
        fireStore.collection('todos').doc(todoId).update({
            title: updateTitle,
            description: updateDescription,
            doneStatus: updateDoneStatus
        })
            .then(() => dispatch({
                type: Actions.updateTodoSuccess
            }))
            .catch(err => dispatch({
                type: Actions.updateTodoError,
                err
            }))
    }
};

function getAllTodosFromFireStore() {
    let allTodos = [];
    return dispatch => {
        fireStore.collection('todos').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => allTodos.push({ id: doc.id, ...doc.data() }));
                dispatch({
                    type: Actions.readAllTodoSuccess,
                    payload: allTodos
                })
            })
            .catch(err => dispatch({
                type: Actions.readAllTodoError,
                err
            }))
    };
};


function taskDoneAttempt(todo) {
    return dispatch => {
        console.log(todo);
        fireStore.collection('todos').doc(todo.id).update({
            title: todo.title,
            description: todo.description,
            doneStatus: true
        })
        .then( () => dispatch({
            type : Actions.taskDoneSuccess
        }))
        .catch( err => dispatch({
            type : Actions.taskDoneError,
            err
        }));
    };
};

function getSpecificTodo() {

};


export {
    insertTodoToFireStore,
    deleterTodoFromFireStore,
    updateTodoInFireStore,
    getAllTodosFromFireStore,
    getSpecificTodo,
    taskDoneAttempt
};


