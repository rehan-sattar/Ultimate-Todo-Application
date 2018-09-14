import swal from "sweetalert";
import { Actions } from './Actions';
const defaultState = {
    allTodos: [],
    error: '',
}
const ultimateTodoReducer = (state = defaultState, action) => {
    let updatedState = { ...state };
    switch (action.type) {
        // add task
        case Actions.addTodoSuccess:
            swal('Todo Added');
            console.log(action.payload);
            break;
        case Actions.addTodoError:
            swal(`Error: ${action.err} !`);
            break;
        case Actions.readAllTodoSuccess:
            updatedState.allTodos = action.payload
            break;
        case Actions.readAllTodoError:
            swal(`Error: ${action.err} !`);
            break;
        case Actions.deleteTodoSuccess:
            swal('Task deleted!');
            break;
        case Actions.deleteTodoError:
            swal(`Error: ${action.err} !`);
            break;
        case Actions.updateTodoSuccess:
            console.log(action.type)
            swal('Todo Updated!');
            break;
        case Actions.updateTodoError:
            swal(`Error: ${action.err} !`);
            break;
        default:
            return updatedState;
    }

    return updatedState;
};

export default ultimateTodoReducer;












/*


import { fireStore } from "../firebase";
// @ts-check
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
                type : Actions.updateTodoSuccess
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

function getSpecificTodo() {

};


export {
    insertTodoToFireStore,
    deleterTodoFromFireStore,
    updateTodoInFireStore,
    getAllTodosFromFireStore,
    getSpecificTodo
};



*/