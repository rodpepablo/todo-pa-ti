
import { ToDoSchema } from './schemas/todo.js'
import { ToDoModel } from './models/todo.js'
import { ToDoController } from './controllers/todo.js'

export class Router {
    constructor () {
        this.ToDoSchema = ToDoSchema
        this.toDoModel = new ToDoModel(this.ToDoSchema)
        this.toDoController = new ToDoController(this.toDoModel)
    }

    connect (app) {
        this.toDoController.use(app)
    }
}
