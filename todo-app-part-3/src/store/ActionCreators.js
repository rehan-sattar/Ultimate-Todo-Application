import { fireStore } from "../firebase";
import { Actions } from "./Actions";
import swal from 'sweetalert';
import store from "./index";

function insertTodoToFireStore(todoState) {
    return dispatch => {
        console.log('inside dispatch of insertTOdo')
        fireStore.collection('todos').add(todoState)
            .then(snapshot => {
                swal('Task added!', 'Your task has been added.', 'success');
            })
            .catch(err => {
                dispatch({
                    type: Actions.addTodoError,
                    err,
                })
            })
    };
};

fireStore.collection('todos').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(function (change) {
        if (change.type === "added") {
            console.log("New todo: ", change.doc.data());
            store.dispatch({
                type: Actions.addTodoSuccess,
                payload: {
                    id: change.doc.id,
                    ...change.doc.data()
                }
            })
        }
        if (change.type === "modified") {
            console.log("Modified todo: ", change.doc.data());
            store.dispatch({
                type: Actions.updateTodoSuccess,
                payload: {
                    id: change.doc.id,
                    ...change.doc.data()
                }
            })

        }
        if (change.type === "removed") {
            console.log("Removed todo: ", change.doc.data());
            store.dispatch({
                type: Actions.deleteTodoSuccess,
                payload: change.doc.id
            })
            swal('Task removed!', 'Your task has been removed.', 'success');
        }
    });
})
function deleterTodoFromFireStore(todoId) {
    return dispatch => {
        console.log('Inside the dispatch of delete todo')
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
            .then(() => {
                swal('Task modifeid!', 'Your task has been modifeid.', 'success');
            })
            .catch(err => dispatch({
                type: Actions.updateTodoError,
                err
            }))
    }
};

function getAllTodosFromFireStore() {
    let allTodos = [];
    console.log('inside getAllFromDatabase')
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


function taskDoneAttempt(todo, status) {
    return dispatch => {
        console.log(todo, status);
        fireStore.collection('todos').doc(todo.id).update({
            title: todo.title,
            description: todo.description,
            doneStatus: status
        })
            .then(() => {
                swal('Task status updated!', 'Your task has been status updated.', 'success');
            })
            .catch(err => dispatch({
                type: Actions.taskDoneError,
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


