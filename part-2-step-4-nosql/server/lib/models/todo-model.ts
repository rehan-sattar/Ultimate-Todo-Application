import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

export const todoSchema = new Schema({
    Title: {
        type: String,

    },
    Description: {
        type: String,
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