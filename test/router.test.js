
import { ToDoController } from '../src/controllers/todo.js'
import { Router } from '../src/router.js'

class TestableRouter extends Router {
    constructor (mock) {
        super()
        this.toDoController = mock
    }
}

test('should build the controllers', () => {
    const router = new Router()
    expect(router.toDoController).toBeInstanceOf(ToDoController)
})

test('should connect controllers to the router', () => {
    const toDoController = { use: jest.fn() }
    const router = new TestableRouter(toDoController)
    const app = jest.fn()
    
    router.connect(app)

    expect(toDoController.use).toHaveBeenCalledWith(app)
})