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
            updatedState.allTodos = updatedState.allTodos.filter(todo => todo._id !== action.payload)
            console.log(updatedState.allTodos)
            break;
        case Actions.deleteTodoError:
            swal(`Error: ${action.err} !`);
            break;
        case Actions.updateTodoSuccess:
            console.log(updatedState.allTodos);
            console.log(action.payload)
            updatedState.allTodos = updatedState.allTodos.filter(todo => {
                if (todo['_id'] === action.payload._id) {
                    console.log('here');
                    todo.Title = action.payload.Title,
                        todo.Description = action.payload.Description,
                        todo.Done = action.payload.Done
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
