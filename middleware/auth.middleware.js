import { authService } from '../api/auth/auth.service.js'
import { loggerService } from '../services/logger.service.js'
  console.log('🚨 requireAuth middleware LOADED!')

export async function requireAuth(req, res, next) {
  console.log('🚨 requireAuth CALLED!')
  try {
    const token = req.cookies?.loginToken
    if (!token) {
      return res.status(401).send({ err: 'Access denied. No token provided.' })
    }

    const user = authService.validateToken(token)

    if (!user) {
      return res.status(401).send({ err: 'Invalid token.' })
    }
    req.loggedInUser = user

    next()
  } catch (err) {
    loggerService.error('Auth middleware error:', err)
    res.status(401).send({ err: 'Invalid token.' })
  }
}
