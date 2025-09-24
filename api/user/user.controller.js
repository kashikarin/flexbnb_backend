import { loggerService } from '../../services/logger.service.js'
import { userService } from './user.service.js'
import { authService } from '../auth/auth.service.js'

export async function getUser(req, res) {
  try {
    const user = await userService.getById(req.params.id)
    if (!user) return res.status(404).send({ err: 'User not found' })
    res.send(user)
  } catch (err) {
    loggerService.error('Failed to get user', err)
    res.status(400).send({ err: 'Failed to get user' })
  }
}

export async function getUsers(req, res) {
  try {
    const filterBy = {
      username: req.query?.username || '',
    }
    const users = await userService.query(filterBy)
    res.send(users)
  } catch (err) {
    loggerService.error('Failed to get users', err)
    res.status(400).send({ err: 'Failed to get users' })
  }
}

export async function deleteUser(req, res) {
  try {
    await userService.remove(req.params.id)
    res.send({ msg: 'Deleted successfully' })
  } catch (err) {
    loggerService.error('Failed to delete user', err)
    res.status(400).send({ err: 'Failed to delete user' })
  }
}

export async function addUser(req, res) {
  console.log('🔥 1. Frontend sent to server:', req.body)
  try {
    const { email, username, password, fullname, imageUrl, isHost } = req.body

    const loginId = email || username

    const exists = await userService.getByLoginId(loginId)
    if (exists) return res.status(409).send({ err: 'User already exists' })

    const saved = await userService.save({
      email,
      username,
      password,
      fullname,
      imageUrl,
      isHost: !!isHost,
      likedHomes: [],
    })

    const mini = {
      _id: saved._id,
      fullname: saved.fullname,
      imageUrl: saved.imageUrl,
      email: saved.email,
      username: saved.username,
      isHost: !!saved.isHost,
      likedHomes: saved.likedHomes,
      createdAt: saved.createdAt,
    }
    res.status(201).json(mini)
  } catch (err) {
    loggerService.error('Failed to add user', err)
    res.status(400).send({ err: 'Failed to add user' })
  }
}

export async function updateUser(req, res) {
  try {
    const user = req.body
    const savedUser = await userService.update(user)
    res.send(savedUser)
  } catch (err) {
    loggerService.error('Failed to update user', err)
    res.status(400).send({ err: 'Failed to update user' })
  }
}

export async function toggleHomeLike(req, res) {
  try {
    const { homeId } = req.params
    const loginToken = req.cookies.loginToken

    if (!loginToken) {
      return res.status(401).json({ error: 'Not authenticated' })
    }

    const user = authService.validateToken(loginToken)
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    const isLiked = await userService.toggleHomeLike(user._id, homeId)

    const updatedUser = await userService.getById(user._id)
    res.json({ isLiked, user: updatedUser })
  } catch (err) {
    loggerService.error('Failed to toggle home like', err)
    res.status(500).json({ err: err.message })
  }
}

export async function getUserLikes(req, res) {
  try {
    const userId = req.loggedInUser._id

    const likedHomes = await userService.getUserLikes(userId)

    res.json({ likedHomes })
  } catch (err) {
    loggerService.error('Failed to get user likes', err)
    res.status(400).send({ err: 'Failed to get likes' })
  }
}
