const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: "Enter title"
    },
    description: {
        type: String,
        required: "Enter Description"
    },
    done: {
        type: Boolean,
        default: false
    },
    createdate: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('todo', todoSchema);
