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
router.get('/health', getHealth)
router.get('/', getMsgs)

router.get('/:msgId', getMsg)
router.put('/:msgId', updateMsg)
router.delete('/:msgId', removeMsg)
router.post('/', addMsg)

export const msgRoutes = router
