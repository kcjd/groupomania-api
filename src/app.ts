import cors from 'cors'
import express, { Application } from 'express'

const app: Application = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes

export default app
