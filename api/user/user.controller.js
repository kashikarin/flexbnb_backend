import { loggerService } from '../../services/logger.service.js'
import { userService } from './user.service.js'

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
  try {
    const { email, username, password, fullname, imgUrl, isHost } = req.body

    // if (!password || !(email || username) || !fullname) {
    //   return res.status(400).send({ err: 'Missing required fields' })
    // }

    const loginId = email || username

    const exists = await userService.getByLoginId(loginId)
    if (exists) return res.status(409).send({ err: 'User already exists' })

    const saved = await userService.save({
      email,
      username,
      password,
      fullname,
      imgUrl,
      isHost: !!isHost,
    })

    const mini = {
      _id: saved._id,
      fullname: saved.fullname,
      imgUrl: saved.imgUrl,
      email: saved.email,
      username: saved.username,
      isHost: !!saved.isHost,
      createdAt: saved.createdAt,
    }
    res.status(201).json(mini)
  } catch (err) {
    loggerService.error('Failed to add user', err)
    res.status(400).send({ err: 'Failed to add user' })
  }
}
// export async function updateUser(req, res) {
//     try {
//         const user = req.body
//         const savedUser = await userService.update(user)
//         res.send(savedUser)
//     } catch (err) {
//         loggerService.error('Failed to update user', err)
//         res.status(400).send({ err: 'Failed to update user' })
//     }
// }
