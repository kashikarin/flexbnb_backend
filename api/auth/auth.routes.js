import express from 'express'
import { health, signup, login, logout } from './auth.controller.js'

const router = express.Router()

router.get('/health', health)
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

export const authRoutes = router
