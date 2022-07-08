
export class ToDoController {
    constructor (model) {
        this.model = model
    }

    use (app) {
        app.get('/todos', this.getToDos.bind(this))
        app.get('/todos/:id', this.getToDo.bind(this))
        app.post('/todos', this.createToDo.bind(this))
        app.put('/todos/:id', this.updateToDo.bind(this))
        app.delete('/todos/:id', this.deleteToDo.bind(this))
    }

    async getToDos (req, res) {
        try {
            const todos = await this.model.findAll()
            res.send({ todos })
        } catch (error) {
            sendError(res, error)
        }
    }

    async getToDo (req, res) {
        try {
            const todo = await this.model.findByID(req.params.id)
            res.send(todo)
        } catch (error) {
            sendError(res, error)
        }
    }

    async createToDo (req, res) {
        try {
            const todo = await this.model.create(req.body)
            res.send(todo)
        } catch (error) {
            sendError(res, error)
        }
    }

    async updateToDo (req, res) {
        try {
            const todo = await this.model.update(req.params.id, req.body)
            res.send(todo)
        } catch (error) {
            if (error.message === '404') {
                res.status(404)
                res.send({ message: `TODO with id ${req.params.id} does not exist` })
            } else {
                sendError(res, error)
            }
        }
    }

    async deleteToDo (req, res) {
        try {
            await this.model.delete(req.params.id)
            res.send({ message: `TODO with id ${req.params.id} deleted successfully` })
        } catch (error) {
            if (error.message === '404') {
                res.status(404)
                res.send({ message: `TODO with id ${req.params.id} does not exist` })
            } else {
                sendError(res, error)
            }
        }
    }
}

function sendError (res, error) {
    console.log(error)
    res.status(500)
    res.send({ error })
}