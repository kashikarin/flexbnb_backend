import { ObjectId } from 'mongodb'
import { loggerService } from '../../services/logger.service.js'
import { socketService } from '../../services/socket.service.js'
import { orderService } from './order.service.js'

export async function getOrders(req, res) {
  const { status, createdAt, homeName, purchaserId } = req.query
  const loggedInUserId = req.loggedInUser?._id
  try {
    const filterBy = {
      status: status ?? '',
      createdAt: createdAt ? Number(createdAt) : null,
      hostId: loggedInUserId,
      homeName: homeName ?? '',
      purchaserId: purchaserId ?? ''
    }
    const orders = await orderService.query(filterBy)
    res.json(orders)
  } catch (err) {
    loggerService.error('Failed to get orders', err)
    res.status(400).send({ err: 'Failed to get orders' })
  }
}

export async function getOrder(req, res) {
  const { orderId } = req.params
  try {
    const order = await orderService.getById(orderId)
    res.json(order)
  } catch (err) {
      loggerService.error(`Failed to get order by id ${orderId}`, err)
      console.error('GET /api/orders error:', err?.message, err?.stack)
      res.status(400).send({ err: 'Failed to get order' })
  }
}

export async function addOrder(req, res) {
  const { loggedInUser } = req
  const order = req.body
  
  try {
    if (!order.host?.userId || !ObjectId.isValid(order.host.userId)) {
      return res.status(400).send({ err: 'Invalid or missing host.userId' })
    }
    
    if (!loggedInUser?._id || !ObjectId.isValid(loggedInUser._id)) {
      return res.status(400).send({ err: 'Invalid purchaser userId' })
    }

    order.purchaser = {
      userId: new ObjectId(loggedInUser._id),
      fullname: loggedInUser.fullname,
      imageUrl: loggedInUser.imageUrl,
      email: loggedInUser.email
    }
    order.host.userId = new ObjectId(order.host.userId)
    order.home.homeId = new ObjectId(order.home.homeId)

    const addedOrder = await orderService.add(order)
    
    socketService.emitToUser({ type: 'home-booked', data: addedOrder, userId: order.host.userId.toString()})

    res.json(addedOrder)
  } catch (err) {
    loggerService.error('Failed to add order', err)
    res.status(400).send({ err: 'Failed to add order' })
  }
}

export async function removeOrder(req, res) {
  const orderId = req.params.orderId
  try {
    const removedId = await orderService.remove(orderId)
    res.json(removedId)
  } catch (err) {
    loggerService.error('Failed to remove order', err)
    res.status(400).send({ err: 'Failed to remove order' })
  }
}

export async function updateOrder(req, res) {
  const order = req.body
  try {
    const updatedOrder = await orderService.update(order)
    res.json(updatedOrder)
  } catch (err) {
    loggerService.error('Failed to update order', err)
    res.status(400).send({ err: 'Failed to update order' })
  }
}

export async function getHealth(req, res) {
  try {
    res.json({ ok: true })
  } catch (err) {
    loggerService.error('Health check failed', err)
    res.status(500).send({ err: 'Health check failed' })
  }
}
