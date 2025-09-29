import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'
import { loggerService } from '../../services/logger.service.js'

export const userService = {
  query,
  getById,
  remove,
  save,
  update,
  getByUsername,
  getByLoginId,
  toggleHomeLike,
  getUserLikes,
}

async function query(filterBy = {}) {
  try {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('users')
    const userCursor = await collection.find(criteria)
    const users = await userCursor.toArray()
    return users
  } catch (err) {
    loggerService.error('cannot find users', err)
    throw err
  }
}

async function getById(userId) {
  try {
    const criteria = { _id: ObjectId.createFromHexString(userId) }
    console.log(criteria)

    const collection = await dbService.getCollection('users')
    const user = await collection.findOne(criteria)
    return user
  } catch (err) {
    loggerService.error(`while finding user ${String(userId)}`, err)
    throw err
  }
}

async function getByUsername(username) {
  try {
    const collection = await dbService.getCollection('users')
    const user = await collection.findOne({ username })
    return user
  } catch (err) {
    loggerService.error('userService[getByUsername] : ', err)
    throw err
  }
}

async function remove(userId) {
  try {
    const collection = await dbService.getCollection('users')
    const result = await collection.deleteOne({ _id: new ObjectId(userId) })
    return result
  } catch (err) {
    loggerService.error('userService[remove] : ', err)
    throw err
  }
}

async function save(user) {
  try {
    const collection = await dbService.getCollection('users')
    const { insertedId } = await collection.insertOne(user)

    const result = {
      _id: insertedId,
      ...user,
    }
    return result
  } catch (err) {
    loggerService.error('userService[save]:', err)
    throw err
  }
}

async function update(user) {
  try {
    const userToSave = { ...user }
    delete userToSave._id

    const collection = await dbService.getCollection('users')
    await collection.updateOne(
      { _id: new ObjectId(user._id) },
      { $set: userToSave }
    )
    return user
  } catch (err) {
    loggerService.error('userService[update]:', err)
    throw err
  }
}

async function toggleHomeLike(userId, homeId) {
  try {
    const collection = await dbService.getCollection('users')
    const user = await collection.findOne({ _id: new ObjectId(userId) })

    if (!user) throw new Error('User not found')
    if (!user.likedHomes) user.likedHomes = []

    const isCurrentlyLiked = user.likedHomes.some(
      (id) => id.toString() === homeId
    )

    let updateOperation
    if (isCurrentlyLiked) {
      updateOperation = { $pull: { likedHomes: homeId } }
    } else {
      updateOperation = { $addToSet: { likedHomes: homeId } }
    }

    await collection.updateOne({ _id: new ObjectId(userId) }, updateOperation)

    return !isCurrentlyLiked
  } catch (err) {
    loggerService.error('userService[toggleHomeLike]:', err)
    throw err
  }
}

async function getUserLikes(userId) {
  try {
    const collection = await dbService.getCollection('users')
    const user = await collection.findOne(
      { _id: new ObjectId(userId) },
      { projection: { likedHomes: 1 } }
    )
    return user?.likedHomes || []
  } catch (err) {
    loggerService.error('userService[getUserLikes]:', err)
    throw err
  }
}

async function getByLoginId(loginId) {
  const collection = await dbService.getCollection('users')
  return collection.findOne({
    $or: [{ email: loginId }, { username: loginId }],
  })
}

function _buildCriteria(filterBy) {
  const criteria = {}
  if (filterBy.city)
    criteria['loc.city'] = { $regex: filterBy.city, $options: 'i' }
  if (filterBy.capacity) criteria.capacity = { $gte: Number(filterBy.capacity) }
  return criteria
}
