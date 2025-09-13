import express from 'express'
import {
  getUser,
  getUsers,
  deleteUser,
  addUser,
  updateUser,
  toggleHomeLike,
  getUserLikes,
} from './user.controller.js'
import { requireAuth } from '../../middleware/auth.middleware.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/likes/:homeId', requireAuth, getUserLikes)
router.get('/:id', getUser)
router.post('/', addUser)
router.put('/:id', updateUser)
router.post('/like/:homeId', requireAuth, toggleHomeLike)
router.delete('/:id', deleteUser)

export const userRoutes = router
