import { loggerService } from "../../services/logger.service.js"
import { ObjectId } from 'mongodb'
import { dbService } from '../../services/db.service.js'
import { asyncLocalStorage } from '../../services/als.service.js'

export const msgService = {
  query,
  getById,
  add,
  update,
  remove
}

async function query(filterBy = {}) {
  try {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('msg')
    const msgCursor = await collection.find(criteria)
    const msgs = await msgCursor.toArray()
    console.log(msgs)
    return msgs
  } catch (err) {
    loggerService.error('cannot find msgs', err)
    throw err
  }
}

async function getById(msgId) {
  try {
    const criteria = { _id: ObjectId.createFromHexString(msgId) }
    const collection = await dbService.getCollection('msg')
    const msg = await collection.findOne(criteria)
    return msg
  } catch (err) {
    loggerService.error(`while finding msg ${String(msgId)}`, err)
    throw err
  }
}

async function remove(msgId) {
    const criteria = { _id: ObjectId.createFromHexString(msgId) }
    try{
        const collection = await dbService.getCollection('msg')
        const res = await collection.deleteOne(criteria)
        if (res.deletedCount === 0) throw new Error('Wrong msg')
        return msgId
    } catch(err) {
        loggerService.error('Failed to remove msg', err)
    throw err
    }
}

async function add(msg) {
  try {
    const collection = await dbService.getCollection('msg')
    await collection.insertOne(msg)
    return msg
  } catch (err) {
    loggerService.error('Failed to add msg', err)
    throw err
  }
}

async function update(msg) {
  const criteria = { _id: ObjectId.createFromHexString(msg._id) }
  const { _id, ...msgToUpdate } = msg
  try {
    const collection = await dbService.getCollection('msg')
    await collection.updateOne(criteria, { $set: msgToUpdate })
    return { ...msg, ...msgToUpdate }
  } catch (err) {
    loggerService.error('Failed to update msg', err)
    throw err
  }
}

function _buildCriteria(filterBy) {
  const criteria = {}

  if (filterBy.senderId) criteria['sender.userId'] = filterBy.senderId 
  if (filterBy.recipientId) criteria['recipient.userId'] = filterBy.recipientId 
  if (filterBy.txt) criteria.txt = {$regex: filterBy.txt, $options: 'i' }
  if (filterBy.orderId) criteria.orderId = filterBy.orderId 
  if (filterBy.homeId) criteria.homeId = filterBy.homeId 

  return criteria
}




