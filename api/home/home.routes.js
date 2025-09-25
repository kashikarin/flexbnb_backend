import express from 'express'
import {
  addHome,
  getHome,
  getHomes,
  updateHome,
  removeHome,
  getHealth,
} from './home.controller.js'
import { log } from '../../middleware/logger.middleware.js'
import { requireAuth } from '../../middleware/auth.middleware.js'
import { requireParams } from '../../middleware/param.middleware.js'

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
router.put('/:homeId', log, updateHome) 
router.delete('/:homeId', removeHome)

// @route  POST /api/homes
// @desc   Add a new home
// @access Authenticated
router.post(
            '/', 
            log, 
            requireAuth, 
            requireParams({
              keys: [
                'name',
                'type',
                'price',
                'capacity',
                'imageUrls',
                'loc.lat',
                'loc.lng',
                'loc.city',
                'loc.country',
                'bookings',
                'summary'
              ]
            }), 
            addHome
          )

export const homeRoutes = router
