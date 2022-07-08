
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import mongoose from 'mongoose'

import { Router } from './src/router.js'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))

const router = new Router()
router.connect(app)

mongoose.connect('mongodb://localhost/todo-pa-ti', (err) => {
    if (err) console.log(err)
    console.log('Connection to the database established')
});

const PORT = process.env.PORT || 8000
app.listen(PORT, (err) => {
    if (err) console.log(err)
    console.log(`Magic on port: ${PORT}`)
})