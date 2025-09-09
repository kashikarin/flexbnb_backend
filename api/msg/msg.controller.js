import { logger } from "../../services/logger.service.js"
import { msgService } from "./msg.service.js"

export async function getMsgs(req, res) {
  const { homeId, senderId, recipientId, orderId, txt } = req.query

  try {
    const filterBy = {
      homeId: homeId ?? '',
      senderId: senderId ?? '',
      recipientId: recipientId ?? '',
      orderId: orderId ?? '',
      txt: txt ?? ''
    }
    const msgs = await msgService.query(filterBy)
    res.json(msgs)
  } catch (err) {
    logger.error('Failed to get msgs', err)
    res.status(400).send({ err: 'Failed to get msgs' })
  }
}

export async function getMsg(req, res) {
  const { msgId } = req.params
  try {
    const msg = await msgService.getById(msgId)
    res.json(msg)
  } catch (err) {
    logger.error(`Failed to get msg by id ${msgId}`, err)
    console.error('GET /api/msgs error:', err?.message, err?.stack)
    res.status(400).send({ err: 'Failed to get msg' })
  }
}

export async function removeMsg(req, res){
    const msgId = req.params.msgId
    try {
        const removedId = await msgService.remove(msgId)
        res.json(removedId)
    } catch(err){
        logger.error('Failed to remove msg', err)
        res.status(400).send({ err: 'Failed to remove msg' })
    }
}

export async function addMsg(req, res) {
  const msg = req.body
  try {
    const addedMsg = await msgService.add(msg)
    res.json(addedMsg)
  } catch (err) {
    logger.error('Failed to add msg', err)
    res.status(400).send({ err: 'Failed to add msg' })
  }
}

export async function getHealth(req, res) {
  try {
    res.json({ ok: true })
  } catch (err) {
    logger.error('Health check failed', err)
    res.status(500).send({ err: 'Health check failed' })
  }
}