import { loggerService } from '../../services/logger.service.js'
import { authService } from './auth.service.js'

export async function health(req, res) {
  const data = authService.ping()
  res.json({ ok: true, ...data })
}

export async function getCurrentUser(req, res) {
  try {
    const loginToken = req.cookies.loginToken

    if (!loginToken) {
      return res.status(401).json({ error: 'No token found' })
    }

    const user = authService.validateToken(loginToken)

    if (!user) {
      res.clearCookie('loginToken')
      return res.status(401).json({ error: 'Invalid token' })
    }

    res.json(user)
  } catch (err) {
    loggerService.error('Failed to get current user: ' + err)
    res.status(401).json({ error: 'Authentication failed' })
  }
}

export async function signup(req, res) {
  try {
    const credentials = req.body

    const account = await authService.signup(credentials)
    loggerService.debug(
      `auth.route - new account created: ` + JSON.stringify(account)
    )

    const user = await authService.login({
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
    })
    loggerService.info('User signup:', user)

    const loginToken = authService.getLoginToken(user)
    res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })

    res.json(user)
  } catch (err) {
    loggerService.error('Failed to signup ' + err)

    res.status(400).send({ err: err.message || 'Failed to signup' })
  }
}

export async function login(req, res) {
  try {
    const { username, email, password } = req.body

    if (!password || (!username && !email)) {
      return res.status(400).send({ err: 'Missing required fields' })
    }

    const user = await authService.login({ username, email, password })
    const loginToken = authService.getLoginToken(user)
    loggerService.info('User login: ', user)
    res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })
    res.send(user)
  } catch (err) {
    loggerService.error('Failed to Login ' + err)

    res.status(401).send({ err: err.message || 'Failed to Login' })
  }
}

export async function googleAuth(req, res) {
  console.log('🚀 GoogleAuth controller hit!') // הוסף את זה

  try {
    const { credential } = req.body

    if (!credential) {
      return res.status(400).send({ err: 'Google credential is required' })
    }

    loggerService.info('Google Auth attempt')

    const user = await authService.googleAuth({ credential })
    const loginToken = authService.getLoginToken(user)

    loggerService.info('Google Auth successful:', user.email)

    res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })
    res.json(user)
  } catch (err) {
    loggerService.error('Failed to Google Auth: ' + err)
    res.status(401).send({ err: err.message || 'Google authentication failed' })
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie('loginToken')
    res.send({ msg: 'Logged out successfully' })
  } catch (err) {
    res.status(400).send({ err: 'Failed to logout' })
  }
}
