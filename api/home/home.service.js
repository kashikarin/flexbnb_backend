import { ObjectId } from 'mongodb'
import { logger } from '../../services/logger.service.js'
import { makeId } from '../../services/util.service.js'
import { dbService } from '../../services/db.service.js'
import { asyncLocalStorage } from '../../services/als.service.js'

export const homeService = {
  query,
  getById,
  add,
  update,
  remove
  // addCarMsg,
  // removeCarMsg,
}

async function query(filterBy = {}) {
  try {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('home')
    const homeCursor = await collection.find(criteria)
    const homes = await homeCursor.toArray()
    console.log(homes)
    return homes
  } catch (err) {
    logger.error('cannot find homes', err)
    throw err
  }
}

async function getById(homeId) {
  try {
    const criteria = { _id: ObjectId.createFromHexString(homeId) }
    const collection = await dbService.getCollection('home')
    const home = await collection.findOne(criteria)
    // home.createdAt = home._id.getTimestamp()
    return home
  } catch (err) {
    logger.error(`while finding home ${String(homeId)}`, err)
    throw err
  }
}

async function add(home) {
  try {
    const collection = await dbService.getCollection('home')
    await collection.insertOne(home)
    return home
  } catch (err) {
    logger.error('Failed to add home', err)
    throw err
  }
}

async function update(home) {
  const criteria = { _id: ObjectId.createFromHexString(home._id) }
  const { _id, ...homeToUpdate } = home
    try {
    const collection = await dbService.getCollection('home')
    await collection.updateOne(criteria, { $set: homeToUpdate })
    return { ...home, ...homeToUpdate}
  } catch (err) {
    logger.error('Failed to update home', err)
    throw err
  }
}

async function remove(homeId) {
    const criteria = { _id: ObjectId.createFromHexString(homeId) }
    try{
        const collection = await dbService.getCollection('home')
        const res = await collection.deleteOne(criteria)
        if (res.deletedCount === 0) throw new Error('Wrong home')
        return homeId
    } catch(err) {
        logger.error('Failed to remove home', err)
    throw err
    }
}

function _buildCriteria(filterBy) {
  const criteria = {}

  if (filterBy.city)
    criteria['loc.city'] = { $regex: filterBy.city, $options: 'i' }
  if (filterBy.capacity) criteria.capacity = { $gte: Number(filterBy.capacity) }

  return criteria
}
