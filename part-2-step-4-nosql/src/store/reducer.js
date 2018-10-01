import swal from "sweetalert";
import { Actions } from './Actions';
const defaultState = {
    allTodos: [],
    error: '',
    addedTodo: false
}
const ultimateTodoReducer = (state = defaultState, action) => {
    let updatedState = { ...state };
    switch (action.type) {
        // add task
        case Actions.addTodoSuccess:
            updatedState.allTodos = [action.payload, ...updatedState.allTodos]
            updatedState.addedTodo = true;
            break;
        case Actions.addTodoError:
            swal(`Error: ${action.err} !`);
            break;
        case Actions.readAllTodoSuccess:
            updatedState.allTodos = action.payload;

            break;
        case Actions.readAllTodoError:
            swal(`Error: ${action.err} !`);
            break;
        case Actions.deleteTodoSuccess:
            updatedState.allTodos = updatedState.allTodos.filter(todo => todo.id !== action.payload)
            break;
        case Actions.deleteTodoError:
            swal(`Error: ${action.err} !`);
            break;
        case Actions.updateTodoSuccess:
            updatedState.allTodos = updatedState.allTodos.filter(todo => {
                if (todo.id === action.payload.id) {
                    todo.title = action.payload.title,
                        todo.description = action.payload.description,
                        todo.doneStatus = action.payload.doneStatus
                };
                return todo
            })

            break;
        case Actions.updateTodoError:
            console.log(action.err)
            swal(`Error: ${action.err} !`);
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
