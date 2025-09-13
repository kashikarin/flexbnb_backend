import { MongoClient } from 'mongodb'

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { homeRoutes } from './api/home/home.routes.js'
import { orderRoutes } from './api/order/order.routes.js'
import { errorHandler } from './middleware/errorHandler.js'
import { userRoutes } from './api/user/user.routes.js'
import { msgRoutes } from './api/msg/msg.routes.js'
import { authRoutes } from './api/auth/auth.routes.js'
import { reviewRoutes } from './api/review/review.routes.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:5174',
      'http://127.0.0.1:5174',
    ],
    credentials: true,
  })
)

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

// Home Routes
app.use('/api/homes', homeRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/users', userRoutes)
app.use('/api/msgs', msgRoutes)
app.use('/api/auth', authRoutes)

app.use('/api/reviews', reviewRoutes)

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
