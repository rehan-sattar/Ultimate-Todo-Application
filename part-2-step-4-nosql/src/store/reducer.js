const defaultState = {
    todos: null,
    newTodo: null,
    deletedTodoFlag: false,
    updatedTodo: null
};
export function todoReducer(state = defaultState, action) {
    let newState = { ...state };
    switch (action.type) {
        case 'ALL_TODOS':

            newState.todos = action.payload
            break;
        case 'TODO_ADDED':
            console.log('Triggered')
            newState.newTodo = action.payload;
            break;
        case 'TODO_DELETED':
            console.log('Triggered')
            newState.deletedTodoFlag = true;
            break;
        case 'DATA_UPDATED':
            console.log('Triggered')            
            newState.updatedTodo = action.payload;
            break;
        default:
            return newState;
    };
    return newState
}

export default todoReducer;