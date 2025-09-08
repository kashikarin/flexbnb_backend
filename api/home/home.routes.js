import express from 'express'
import { addHome, getHome, getHomes, updateHome } from './home.controller.js'

const router = express.Router()

// @route  GET /api/homes
// @desc   Get all homes
// @access Public
router.get('/', getHomes)
router.get('/:homeId', getHome)
router.post('/', addHome)
router.put('/:homeId', updateHome)
// @route  POST /api/homes
// @desc   Add a new home
// @access Authenticated


export const homeRoutes = router
