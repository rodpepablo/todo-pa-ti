
export class ToDoModel {
    constructor (Schema) {
        this.Schema = Schema
    }

    findAll () {
        return this.Schema.find({})
    }

    findByID (id) {
        return this.Schema.findOne({id})
    }

    create (body) {
        const todo = new this.Schema({
            title: body.title,
            description: body.description
        })

        return todo.save()
    }

    async update (id, body) {
        const todo = await this.findByID(id)
        if (todo != null) {
            const fields = { ...todo.toJSON(), ...body }
            todo.title = fields.title
            todo.description = fields.description
            todo.done = fields.done
            return todo.save()
        } else {
            throw new Error('404')
        }
    }

    async delete (id) {
        const todo = await this.findByID(id)
        if (todo != null) {
            return todo.remove()
        } else {
            throw new Error('404')
        }
    }
}
