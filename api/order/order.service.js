import { ObjectId } from 'mongodb'

import { makeId } from '../../services/util.service.js'
import { dbService } from '../../services/db.service.js'
import { asyncLocalStorage } from '../../services/als.service.js'
import { loggerService } from '../../services/logger.service.js'

export const orderService = {
  query,
  getById,
  add,
  update,
  remove
}

async function query(filterBy = {}) {
  try {
    const criteria = _buildCriteria(filterBy)
        console.log('🔍 criteria:', criteria)   // 👈
    
    const collection = await dbService.getCollection('order')
    const orderCursor = await collection.find(criteria)
    const orders = await orderCursor.toArray()
    return orders
  } catch (err) {
    loggerService.error('cannot find orders', err)
    throw err
  }
}

async function getById(orderId) {
  try {
    const criteria = { _id: ObjectId.createFromHexString(orderId) }
    const collection = await dbService.getCollection('order')
    const order = await collection.findOne(criteria)
    // order.createdAt = order._id.getTimestamp()
    return order
  } catch (err) {
    loggerService.error(`while finding order ${String(orderId)}`, err)
    throw err
  }
}

async function add(order) {
  try {
    const collection = await dbService.getCollection('order')
    const result = await collection.insertOne(order)
    order._id = result.insertedId
    return order
  } catch (err) {
    loggerService.error('Failed to add order', err)
    throw err
  }
}

async function update(order) {
  const criteria = { _id: ObjectId.createFromHexString(order._id) }
  const { _id, ...orderToUpdate } = order
  try {
    const collection = await dbService.getCollection('order')
    await collection.updateOne(criteria, { $set: orderToUpdate })
    return { ...order, ...orderToUpdate }
  } catch (err) {
    loggerService.error('Failed to update order', err)
    throw err
  }
}

async function remove(orderId) {
  const criteria = { _id: ObjectId.createFromHexString(orderId) }
  try {
    const collection = await dbService.getCollection('order')
    const res = await collection.deleteOne(criteria)
    if (res.deletedCount === 0) throw new Error('Wrong order')
    return orderId
  } catch (err) {
    loggerService.error('Failed to remove order', err)
    throw err
  }
}

function _buildCriteria(filterBy) {
  const criteria = {}

  if (!filterBy.hostId || !ObjectId.isValid(filterBy.hostId)) {
    throw new Error('hostId is required for dashboard queries')
  }

  criteria['host.userId'] = new ObjectId(filterBy.hostId)

  if (filterBy.status && filterBy.status !== 'all') {
    criteria.status = { $regex: filterBy.status, $options: 'i' }
  }
  if (filterBy.txt) {
    const regex = { $regex: filterBy.txt, $options: 'i' }
    criteria.$or = [
      { 'home.name': regex },
      { 'purchaser.fullname': regex },
    ]
  }
    
  return criteria
}
