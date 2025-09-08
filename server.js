import { MongoClient } from 'mongodb'

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { homeRoutes } from './api/home/home.routes.js'
import { errorHandler } from './middleware/errorHandler.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

// Routes
app.use('/api/homes', homeRoutes)

// 404 - Fallback route
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
