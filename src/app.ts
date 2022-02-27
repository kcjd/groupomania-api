import 'dotenv/config'

import cors from 'cors'
import express, { Application } from 'express'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import path from 'path'

import auth from './middleware/auth'
import handleErrors from './middleware/handleErrors'
import authRoute from './routes/auth.route'
import postsRoute from './routes/posts.route'
import usersRoute from './routes/users.route'

const app: Application = express()

app.use(cors())
app.use(express.json())

app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
)

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: 'Trop de requêtes, veuillez réessayer plus tard'
  })
)

app.use(express.static(path.join(__dirname, '../public')))

app.use('/auth', authRoute)

app.use(auth)

app.use('/posts', postsRoute)
app.use('/users', usersRoute)

app.use(handleErrors)

export default app
