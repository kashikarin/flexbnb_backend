import express from 'express'
import {
  addReview,
  getReview,
  getReviews,
  updateReview,
  removeReview,
  getHealth,
} from './review.controller.js'
import { log } from '../../middleware/logger.middleware.js'
import { requireAuth } from '../../middleware/auth.middleware.js'

const router = express.Router()
router.get('/health', getHealth)
router.get('/', getReviews)

router.get('/:reviewId', getReview)
router.put('/:reviewId', log, requireAuth, updateReview)
router.delete('/:reviewId', log, requireAuth, removeReview)
router.post('/', log, requireAuth, addReview)

export const reviewRoutes = router
