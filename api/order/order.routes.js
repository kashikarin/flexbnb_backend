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
import { requireParams } from '../../middleware/param.middleware.js'

console.log('📦 order.routes loaded')
const router = express.Router()
// @route   GET /api/homes
// @desc    Health check
// @access Public
router.get('/health', getHealth)

// @route  GET /api/homes
// @desc   Get all homes
// @access Public
router.get('/', log, requireAuth, getOrders)

router.get('/:orderId', log, requireAuth, getOrder)
router.put(
            '/:orderId', 
            log, 
            requireAuth, 
            requireParams({keys: [
                  'host.userId', 
                  'purchaser.userId', 
                  'purchaser.fullname', 
                  'purchaser.email', 
                  'totalPrice', 
                  'checkIn', 
                  'checkOut', 
                  'guests', 
                  'home.homeId', 
                  'home.name', 
                  'home.imageUrl',
                  'status'
                  ]                
             }), 
            updateOrder
          )
router.delete('/:orderId', log, requireAuth, removeOrder)

// // @route  POST /api/orders
// // @desc   Add a new order
// // @access Authenticated
router.post(
            '/', 
            log, 
            requireAuth, 
            requireParams({
              keys: [
                'host.userId', 
                'totalPrice', 
                'checkIn', 
                'checkOut', 
                'guests', 
                'home.homeId', 
                'home.name', 
                'home.imageUrl',
                'status'
              ]

            }), 
            addOrder)

export const orderRoutes = router
