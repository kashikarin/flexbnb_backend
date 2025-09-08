import fs from 'fs'
import { makeId, readJsonFile } from '../../services/util.service.js'
import { logger } from '../../services/logger.service.js'
import { dbService } from '../../services/db.service.js'

// import loggerService from '../../services/logger.service.js'
const users = readJsonFile('data-import/users.json')

export const userService = {
  query,
  getById,
  remove,
  save,
  getByUsername,
}
async function query(filterBy = {}) {
  try {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('users')
    const userCursor = await collection.find(criteria)
    const users = await userCursor.toArray()
    console.log(users)
    return users
  } catch (err) {
    logger.error('cannot find users', err)
    throw err
  }
}

async function getById(userId) {
  try {
    const criteria = { _id: ObjectId.createFromHexString(userId) }
    const collection = await dbService.getCollection('users')
    const user = await collection.findOne(criteria)
    // user.createdAt = user._id.getTimestamp()
    return user
  } catch (err) {
    logger.error(`while finding user ${String(userId)}`, err)
    throw err
  }
}

async function getByUsername(username) {
  try {
    const user = users.find((user) => user.username === username)
    // if (!user) throw `User not found by username : ${username}`
    return user
  } catch (err) {
    logger.error('userService[getByUsername] : ', err)
    throw err
  }
}

async function remove(userId) {
  try {
    const idx = users.findIndex((user) => user._id === userId)
    if (idx === -1) throw `Couldn't find user with _id ${userId}`

    users.splice(idx, 1)
    await _saveUsersToFile()
  } catch (err) {
    logger.error('userService[remove] : ', err)
    throw err
  }
}

async function save(user) {
  try {
    // Only handles user ADD for now
    user._id = makeId()
    user.createdAt = Date.now()
    if (!user.imgUrl)
      user.imgUrl =
        'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    users.push(user)
    await _saveUsersToFile()
    return user
  } catch (err) {
    loggerService.error('userService[save] : ', err)
    throw err
  }
}

function _saveUsersToFile() {
  return new Promise((resolve, reject) => {
    const usersStr = JSON.stringify(users, null, 4)
    fs.writeFile('data-import/users.json', usersStr, (err) => {
      if (err) {
        return console.log(err)
      }
      resolve()
    })
  })
}
function _buildCriteria(filterBy) {
  const criteria = {}

  if (filterBy.city)
    criteria['loc.city'] = { $regex: filterBy.city, $options: 'i' }
  if (filterBy.capacity) criteria.capacity = { $gte: Number(filterBy.capacity) }

  return criteria
}
