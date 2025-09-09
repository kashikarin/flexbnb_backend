import express from 'express'
import {
  addReview,
  getReview,
  getReviews,
  updateReview,
  removeReview,
  getHealth,
} from './review.controller.js'

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
router.put('/:reviewId', updateReview)
router.delete('/:reviewId', removeReview)

// // @route  POST /api/reviews
// // @desc   Add a new review
// // @access Authenticated
router.post('/', addReview)

export const reviewRoutes = router
