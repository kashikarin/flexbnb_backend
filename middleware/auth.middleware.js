import { authService } from '../api/auth/auth.service.js'
import { loggerService } from '../services/logger.service.js'

export async function requireAuth(req, res, next) {
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
    const user = req.loggedInUser || {}
    const userId = user._id || 'Unknown'
    const name = user.fullname || user.username || 'Unknown'

    loggerService.error('Auth middleware error:', { uid, name, err })
    res.status(401).send({ err: 'Invalid token.' })
  }
}
