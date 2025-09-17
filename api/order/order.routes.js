import express from 'express'
import {
  addOrder,
  getOrder,
  getOrders,
  updateOrder,
  removeOrder,
  getHealth,
} from './order.controller.js'
import {requireAuth} from '../../middleware/auth.middleware.js'
import { log } from '../../middleware/logger.middleware.js'

const router = express.Router()
// @route   GET /api/homes
// @desc    Health check
// @access Public
router.get('/health', getHealth)

// @route  GET /api/homes
// @desc   Get all homes
// @access Public
router.get('/', log, getOrders)

router.get('/:orderId', log, requireAuth, getOrder)
router.put('/:orderId', log, requireAuth, updateOrder)
router.delete('/:orderId', log, requireAuth, removeOrder)

// // @route  POST /api/orders
// // @desc   Add a new order
// // @access Authenticated
router.post('/', log, requireAuth, addOrder)

export const orderRoutes = router
