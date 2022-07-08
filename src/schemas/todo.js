
import mongoose from 'mongoose'

const ToDo = new mongoose.Schema({
    title: String,
    description: String,
    date: {
        type: Date,
        default: Date.now
    },
    done: {
        type: Boolean,
        default: () => false
    }
})

export const ToDoSchema = mongoose.model('ToDo', ToDo)