import express from 'express'
import {
  addMsg,
  getMsg,
  getMsgs,
  updateMsg,
  removeMsg,
  getHealth,
} from './msg.controller.js'

const router = express.Router()
// @route   GET /api/homes
// @desc    Health check
// @access Public
router.get('/health', getHealth)

// @route  GET /api/homes
// @desc   Get all homes
// @access Public
router.get('/', getMsgs)

router.get('/:msgId', getMsg)
router.put('/:msgId', updateMsg)
router.delete('/:msgId', removeMsg)

// // @route  POST /api/orders
// // @desc   Add a new order
// // @access Authenticated
router.post('/', addMsg)

export const msgRoutes = router
