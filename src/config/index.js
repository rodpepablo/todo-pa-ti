
import mongoose from "mongoose"

import { developmentConfig } from "./development.js"

const config = process.env.ENV === 'production' ? {} : developmentConfig

config.database.driver = config.database.driver === 'mongoose' ? mongoose : {}

export { config }
