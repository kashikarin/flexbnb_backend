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

const router = express.Router()
router.get('/health', getHealth)
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
