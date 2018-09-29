// Crud operation testing

it('should read all todos from database', () => {
    const mockTodoInsertFunction = () => {
       return fetch(`http://localhost:2000/todo/api/v1.0/tasks/add`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: "test",
                description: "test"
            })
        })
    };

    mockTodoInsertFunction()
        .then( res => res.json())
        .then( data => {
            expect(data.status).toBeTruthy();
        }); 
});


it('should add a todo in database', () => {

});


it('should update a todo in database', () => {

});


it('should hadnle done status in database', () => {

});