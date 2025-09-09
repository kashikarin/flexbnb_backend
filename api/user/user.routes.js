import express from 'express'
import { getUser, getUsers, deleteUser, addUser } from './user.controller.js'
//updateUser
const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', addUser)
// router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export const userRoutes = router
