
export class Server {
    constructor (express) {
        this.express = express
    }
    
    configure (middlewares, Router, config) {
        this.port = process.env.PORT || config.port
        this.dbConfig = config.database

        this.app = this.express()
        const router = new Router()
        
        this.app.use(middlewares.bodyParser.urlencoded({ extended: false }))
        this.app.use(middlewares.bodyParser.json())
        this.app.use(middlewares.morgan('dev'))
        router.connect(this.app)
    }

    start () {
        this.dbConfig.driver.connect(this.dbConfig.url, this.databaseConnectionCallback);
        this.app.listen(this.port, this.serverConnectionCallback)
    }

    databaseConnectionCallback (err) {
        if (err) console.log(err)
        console.log('Connection to the database established')
    }

    serverConnectionCallback (err) {
        if (err) console.log(err)
        console.log(`Magic on port: ${this.port}`)
    }
}
