
import { config } from '../src/config/index.js'
import { Server } from '../src/server.js'

config.database.driver = () => {}

let app, express, middlewares, router, connect, server

beforeAll(() => {
    config.database.driver = { connect: jest.fn() }
    app = { use: jest.fn(), listen: jest.fn() }
    express = () => app
    middlewares = {
        bodyParser: {
            urlencoded: jest.fn(),
            json: jest.fn()
        },
        morgan: jest.fn()
    }
    connect = jest.fn()
    router = jest.fn().mockImplementation(() => {
        return { connect }
    })
    server = new Server(express)
})

describe('Configure', () => {

    test('should connect middlewares to the app', () => {
        const bpUrlencodedReturnMock = jest.fn()
        const bpJSONReturnMock = jest.fn()
        const morganReturnMock = jest.fn()
        middlewares.bodyParser.urlencoded.mockReturnValue(bpUrlencodedReturnMock)
        middlewares.bodyParser.json.mockReturnValue(bpJSONReturnMock)
        middlewares.morgan.mockReturnValue(morganReturnMock)
        
        server.configure(middlewares, router, config)

        expect(middlewares.bodyParser.urlencoded).toHaveBeenCalledWith({ extended: false })
        expect(middlewares.bodyParser.json).toHaveBeenCalledWith()
        expect(middlewares.morgan).toHaveBeenCalledWith('dev')
    
        expect(app.use).toHaveBeenCalledWith(bpUrlencodedReturnMock)
        expect(app.use).toHaveBeenCalledWith(bpJSONReturnMock)
        expect(app.use).toHaveBeenCalledWith(morganReturnMock)
    })
    
    test('should connect the main router to the app', () => {
        server.configure(middlewares, router, config)
        
        expect(connect).toHaveBeenCalledWith(app)
    })

})

describe('Start', () => {
    test('should start the server and the database', () => {
        server.configure(middlewares, router, config)
        server.start()

        expect(config.database.driver.connect)
            .toHaveBeenCalledWith(config.database.url, server.databaseConnectionCallback)
        expect(app.listen).toHaveBeenCalledWith(config.port, server.serverConnectionCallback)
    })
})