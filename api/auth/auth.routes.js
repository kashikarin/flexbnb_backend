import express from 'express'
import {
  health,
  signup,
  login,
  logout,
  googleAuth,
  getCurrentUser,
} from './auth.controller.js'

const router = express.Router()

router.get('/health', health)
router.get('/me', getCurrentUser)
router.post('/signup', signup)
router.post('/login', login)
router.post('/google', googleAuth)
router.post('/logout', logout)

export const authRoutes = router
