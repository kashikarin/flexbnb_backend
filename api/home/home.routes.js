import express from 'express'
import {
  addHome,
  getHome,
  getHomes,
  updateHome,
  removeHome,
  getHealth,
} from './home.controller.js'

const router = express.Router()
// @route   GET /api/homes
// @desc    Health check
// @access Public
router.get('/health', getHealth)

// @route  GET /api/homes
// @desc   Get all homes
// @access Public
router.get('/', getHomes)

router.get('/:homeId', getHome)
router.put('/:homeId', updateHome)
router.delete('/:homeId', removeHome)

// @route  POST /api/homes
// @desc   Add a new home
// @access Authenticated
router.post('/', addHome)

export const homeRoutes = router
