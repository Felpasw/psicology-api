import express from 'express'
import bodyParser from 'body-parser'
import router from './routes/routes'
import helmet from 'helmet'
import cors from 'cors'

require('dotenv').config()

const app = express()

const corsOptions = {
    origin: process.env.CORS || '*',
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}


app.use(cors(corsOptions))

const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.use(bodyParser.raw())


app.use(helmet({
    crossOriginResourcePolicy: false,
}))

app.use(router)

export default app
