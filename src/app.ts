import 'dotenv/config'

import cors from 'cors'
import express, { Application } from 'express'
import path from 'path'

import auth from './middleware/auth'
import handleErrors from './middleware/handleErrors'
import authRoute from './routes/auth.route'
import postsRoute from './routes/posts.route'
import usersRoute from './routes/users.route'

const app: Application = express()

// Middleware
app.use(cors())
app.use(express.json())

// Static
app.use(express.static(path.join(__dirname, '../public')))

// Routes
app.use('/auth', authRoute)
app.use('/posts', auth, postsRoute)
app.use('/users', auth, usersRoute)

app.use(handleErrors)

export default app
