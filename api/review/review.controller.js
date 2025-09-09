import { loggerService } from '../../services/logger.service.js'
import { reviewService } from './review.service.js'

export async function getReviews(req, res) {
  const { txt, userId, createdAt, homeId, rating } = req.query

  try {
    const filterBy = {
      txt: txt ?? '',
      createdAt: createdAt ? Number(createdAt) : null,
      userId: userId ?? '',
      homeId: homeId ?? '',
      rating: rating? Number(rating) : null,
    }
    const reviews = await reviewService.query(filterBy)
    res.json(reviews)
  } catch (err) {
    loggerService.error('Failed to get reviews', err)
    res.status(400).send({ err: 'Failed to get reviews' })
  }
}

export async function getReview(req, res) {
  const { reviewId } = req.params
  try {
    const review = await reviewService.getById(reviewId)
    res.json(review)
  } catch (err) {
      logger.error(`Failed to get review by id ${reviewId}`, err)
      console.error('GET /api/reviews error:', err?.message, err?.stack)
      res.status(400).send({ err: 'Failed to get review' })
  }
}

export async function addReview(req, res) {
  const review = req.body
  try {
    const addedReview = await reviewService.add(review)
    res.json(addedReview)
  } catch (err) {
    loggerService.error('Failed to add review', err)
    res.status(400).send({ err: 'Failed to add review' })
  }
}

export async function removeReview(req, res) {
  const reviewId = req.params.reviewId
  try {
    const removedId = await reviewService.remove(reviewId)
    res.json(removedId)
  } catch (err) {
    loggerService.error('Failed to remove review', err)
    res.status(400).send({ err: 'Failed to remove review' })
  }
}

export async function updateReview(req, res) {
  const review = req.body
  try {
    const updatedReview = await reviewService.update(review)
    res.json(updatedReview)
  } catch (err) {
    loggerService.error('Failed to update review', err)
    res.status(400).send({ err: 'Failed to update review' })
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
