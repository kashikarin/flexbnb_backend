import express from 'express'
import {
  addOrder,
  getOrder,
  getOrders,
  updateOrder,
  removeOrder,
  getHealth,
} from './order.controller.js'

const router = express.Router()
// @route   GET /api/homes
// @desc    Health check
// @access Public
router.get('/health', getHealth)

// @route  GET /api/homes
// @desc   Get all homes
// @access Public
router.get('/', getOrders)

router.get('/:orderId', getOrder)
router.put('/:orderId', updateOrder)
router.delete('/:orderId', removeOrder)

// // @route  POST /api/orders
// // @desc   Add a new order
// // @access Authenticated
router.post('/', addOrder)

export const orderRoutes = router
