import { ObjectId } from 'mongodb'
import { dbService } from '../../services/db.service.js'
import { loggerService } from '../../services/logger.service.js'

function toObjectId(id) {
    if (id instanceof ObjectId) return id
    if (ObjectId.isValid(id)) return new ObjectId(id)
    throw new Error(`❌ Invalid ObjectId: ${id}`)
}

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
    const criteria = { _id: toObjectId(orderId) }
    const collection = await dbService.getCollection('order')
    const order = await collection.findOne(criteria)
    console.log("📄 getById found:", order)
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
  const criteria = { _id: toObjectId(order._id) }
  const { _id, ...orderToUpdate } = order
  
  orderToUpdate.host.userId = toObjectId(orderToUpdate.host.userId)
  orderToUpdate.home.homeId = toObjectId(orderToUpdate.home.homeId)
  orderToUpdate.purchaser.userId = toObjectId(orderToUpdate.purchaser.userId)
  
  try {
    const collection = await dbService.getCollection('order')
    await collection.updateOne(criteria, { $set: orderToUpdate })
    return orderToUpdate
  } catch (err) {
    loggerService.error('Failed to update order', err)
    throw err
  }
}

async function remove(orderId) {
  const criteria = { _id: toObjectId(orderId) }
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
  return criteria
}
