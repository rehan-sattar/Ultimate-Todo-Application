import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const todo = new Schema({
    Title: {
        type: String,
        required: "Enter title"
    },
    Description: {
        type: String,
        required: "Enter Description"
    },
    Done: {
        type: Boolean,
        default: false
    },
    CreatedAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = Mongoose.model('todo', todo);
