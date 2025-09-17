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
// @route   GET /api/homes
// @desc    Health check
// @access Public
router.get('/health', getHealth)

// @route  GET /api/homes
// @desc   Get all homes
// @access Public
router.get('/', getReviews)

router.get('/:reviewId', getReview)
router.put('/:reviewId', log, requireAuth, updateReview)
router.delete('/:reviewId', log, requireAuth, removeReview)

// // @route  POST /api/reviews
// // @desc   Add a new review
// // @access Authenticated
router.post('/', log, requireAuth, addReview)

export const reviewRoutes = router
