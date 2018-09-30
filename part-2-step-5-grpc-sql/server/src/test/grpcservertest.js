
global.Mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/grpctodo';
Mongoose.Promise = global.Promise;
Mongoose.connect(mongoDB, { useNewUrlParser: true })
    .then(() => console.log('Mongodb connection succesful'))
    .catch((err) => console.error(err));
Mongoose.set('useCreateIndex', true);
const TodoDb = require('../tododb');


var assert = {
    get: function (call,callback) {
        var payload = {
            condition: {
                id: call
            }
        };
        var t = new TodoDb(payload);
        t.get(callback);
    },

    delete: function (call,callback) {
        var payload = {
            condition: {
                id: call
            }
        };
        var t = new TodoDb(payload);
        t.delete(callback);
    },

};


// try to get one todo
try {
    assert.get(parseInt(40),(error, todo)=>{
        console.log(todo);
    });
    console.log('Passed.');
} catch (error) {
    console.log(error.message);
}


// try to delete todo
try {
    assert.delete(40,(error, todo)=>{
        console.log(todo);
    });
    console.log('Passed.');
} catch (error) {
    console.log(error.message);
}
