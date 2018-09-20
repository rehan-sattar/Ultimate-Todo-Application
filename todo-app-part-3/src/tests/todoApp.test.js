import {
    insertTodoToFireStore,
    updateTodoInFireStore,
    deleterTodoFromFireStore,
} from "../store/ActionCreators";

const testObject = {
    title: 'Testing',
    description: 'Testing 124',
    doneStatus: false,
};

// testing functions 

test('should be call perfectly', () => {
    const resultOfDisptchFunction = insertTodoToFireStore(testObject);

});


test('should  recieve object of 4 props and call ok true' , () => {
    const result = updateTodoInFireStore({
        ...testObject,
        id : expect.any(String)
    });
});
