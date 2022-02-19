import 'dotenv/config'

import cors from 'cors'
import express, { Application } from 'express'

import auth from './middleware/auth'
import handleErrors from './middleware/handleErrors'
import authRoute from './routes/auth.route'
import postsRoute from './routes/posts.route'

const app: Application = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/auth', authRoute)
app.use('/posts', auth, postsRoute)

app.use(handleErrors)

export default app
