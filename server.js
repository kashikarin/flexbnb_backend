import { MongoClient } from 'mongodb'

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import http from 'http'
import path from 'path'

import { homeRoutes } from './api/home/home.routes.js'
import { orderRoutes } from './api/order/order.routes.js'
import { errorHandler } from './middleware/errorHandler.js'
import { userRoutes } from './api/user/user.routes.js'
import { msgRoutes } from './api/msg/msg.routes.js'
import { authRoutes } from './api/auth/auth.routes.js'
import { reviewRoutes } from './api/review/review.routes.js'
import { cloudinaryRoutes } from './api/cloudinary/cloudinary.routes.js'
import { setupSocketAPI } from './services/socket.service.js'

import cookieParser from 'cookie-parser'
import geocodeRoutes from './api/geocode/geocode.routes.js'

dotenv.config()

const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve('public')))
} else {
  const corsOptions = {
    origin: [
      'http://127.0.0.1:8000',
      'http://localhost:8000',
      'http://127.0.0.1:5173',
      'http://localhost:5173',
      'http://127.0.0.1:5174',
      'http://localhost:5174',
    ],
    credentials: true,
  }
  app.use(cors(corsOptions))
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

// API Routes
app.use('/api/homes', homeRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/users', userRoutes)
app.use('/api/msgs', msgRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/cloudinary', cloudinaryRoutes)
app.use('/api/geocode', geocodeRoutes)

setupSocketAPI(server)

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      res.sendFile(path.resolve('public', 'index.html'))
    } else {
      next()
    }
  })
}

app.use('/api/*', (req, res, next) => {
  const error = new Error(`API Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
})

app.use(errorHandler)

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
