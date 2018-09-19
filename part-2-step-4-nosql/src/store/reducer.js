const defaultState = {
    todos: null,
    newTodo: null,
    deletedTodoFlag : false,
    updatedTodo: null
};
export function todoReducer(state = defaultState, action) {
    let newState = { ...state };
    switch (action.type) {
        case 'ALL_TODOS':
            console.log(action.payload)
            newState.todos = action.payload
            break;
        case 'TODO_ADDED':
            newState.newTodo = action.payload;
            break;
        case 'TODO_DELETED':
            newState.deletedTodoFlag = true;
            break;
        case 'DATA_UPDATED':
            newState.updatedTodo = action.payload;
            break;
        default:
            return newState;
    };

    return newState
}

export default todoReducer;