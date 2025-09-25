import express from 'express'
import {
  health,
  signup,
  login,
  logout,
  googleAuth,
  getCurrentUser,
} from './auth.controller.js'
import { requireParams } from '../../middleware/param.middleware.js'
import { log } from '../../middleware/logger.middleware.js'

const router = express.Router()

router.get('/health', health)
router.get('/me', getCurrentUser)
router.post(
        '/signup', 
        log,
        requireParams({
          keys: [ 'email', 'fullname', 'username', 'password' ]
        }),
        signup
      )
router.post('/login', log, requireParams({keys: [ 'password']}), login)
router.post('/google', googleAuth)
router.post('/logout', logout)

export const authRoutes = router
