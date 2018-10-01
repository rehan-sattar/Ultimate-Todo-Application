"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.todoSchema = new Schema({
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
});
//# sourceMappingURL=todo-model.js.map