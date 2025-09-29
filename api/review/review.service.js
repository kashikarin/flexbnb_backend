import { ObjectId } from 'mongodb'
import { dbService } from '../../services/db.service.js'
import { loggerService } from '../../services/logger.service.js'

export const reviewService = {
  query,
  getById,
  add,
  update,
  remove,
}

async function query(filterBy = {}) {
  try {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('review')
    const reviewCursor = await collection.find(criteria)
    const reviews = await reviewCursor.toArray()
    console.log(reviews)
    return reviews
  } catch (err) {
    loggerService.error('cannot find reviews', err)
    throw err
  }
}

async function getById(reviewId) {
  try {
    const criteria = { _id: ObjectId.createFromHexString(reviewId) }
    const collection = await dbService.getCollection('review')
    const review = await collection.findOne(criteria)
    return review
  } catch (err) {
    loggerService.error(`while finding review ${String(reviewId)}`, err)
    throw err
  }
}

async function add(review) {
  try {
    const collection = await dbService.getCollection('review')
    await collection.insertOne(review)
    return review
  } catch (err) {
    loggerService.error('Failed to add review', err)
    throw err
  }
}

async function update(review) {
  const criteria = { _id: ObjectId.createFromHexString(review._id) }
  const { _id, ...reviewToUpdate } = review
  try {
    const collection = await dbService.getCollection('review')
    await collection.updateOne(criteria, { $set: reviewToUpdate })
    return { ...review, ...reviewToUpdate }
  } catch (err) {
    loggerService.error('Failed to update review', err)
    throw err
  }
}

async function remove(reviewId) {
  const criteria = { _id: ObjectId.createFromHexString(reviewId) }
  try {
    const collection = await dbService.getCollection('review')
    const res = await collection.deleteOne(criteria)
    if (res.deletedCount === 0) throw new Error('Wrong review')
    return reviewId
  } catch (err) {
    loggerService.error('Failed to remove review', err)
    throw err
  }
}

function _buildCriteria(filterBy) {
  const criteria = {}

  if (filterBy.txt) criteria.txt = {$regex: filterBy.txt, $options: 'i' }
  if (filterBy.createdAt) {
    const dayStart = new Date(Number(filterBy.createdAt))
    const dayEnd = new Date(dayStart)
    dayEnd.setDate(dayEnd.getDate() + 1)

    criteria.createdAt = { $gte: dayStart, $lt: dayEnd }
  }
  if (filterBy.homeId) criteria.homeId = filterBy.homeId 
  if (filterBy.userId) criteria['by.userId'] = filterBy.userId 
  if (filterBy.rating) criteria.rating = { $gte: filterBy.rating } 
  
  return criteria
}
