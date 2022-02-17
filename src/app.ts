import 'dotenv/config'

import cors from 'cors'
import express, { Application } from 'express'

import handleErrors from './middleware/handleErrors'
import authRoute from './routes/auth.route'

const app: Application = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/auth', authRoute)

app.use(handleErrors)

export default app
