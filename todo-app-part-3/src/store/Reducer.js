import swal from "sweetalert";
import { Actions } from './Actions';
const defaultState = {
    allTodos: [],
    error: '',
    addedTodo : false
}
const ultimateTodoReducer = (state = defaultState, action) => {
    let updatedState = { ...state };
    switch (action.type) {
        // add task
        case Actions.addTodoSuccess:
            swal('Todo Added');
            updatedState.addedTodo = true;
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
        case Actions.taskDoneSuccess:
            swal(`Task Done!`);
            break;
        case Actions.taskDoneError:
            swal(`Error: ${action.err} !`);
            break
        default:
            return updatedState;
    }

    return updatedState;
};

export default ultimateTodoReducer;
