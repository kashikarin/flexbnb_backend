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
router.get('/health', getHealth)
router.get('/', getHomes)
router.get('/:homeId', getHome)
router.put('/:homeId', log, updateHome) 
router.delete('/:homeId', removeHome)
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
