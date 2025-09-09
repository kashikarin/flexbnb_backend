import { loggerService } from '../../services/logger.service.js'
import { authService } from './auth.service.js'

export async function health(req, res) {
  const data = authService.ping()
  res.json({ ok: true, ...data })
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
    res.status(400).send({ err: 'Failed to signup' })
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
    res.status(401).send({ err: 'Failed to Login' })
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
