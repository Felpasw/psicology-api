import express from 'express'
import bodyParser from 'body-parser'
import router from './routes/routes'
import helmet from 'helmet'

const app = express()

const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(bodyParser.json())
app.use(helmet())

app.use(router)

export default app
