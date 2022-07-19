
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import { Server } from './src/server.js'
import { config } from './src/config/index.js'
import { Router } from './src/router.js'

const middlewares = { bodyParser, morgan }

const server = new Server(express)
server.configure(middlewares, Router, config)
server.start()