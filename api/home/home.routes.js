import express from 'express'
import { getHome, getHomes } from './home.controller.js'

const router = express.Router()

// @route  GET /api/homes
// @desc   Get all homes
// @access Public
router.get('/', getHomes)
router.get('/:homeId', getHome)

// @route  POST /api/homes
// @desc   Add a new home
// @access Authenticated
router.post('/', (req, res) => {
  const newHome = req.body
  res
    .status(201)
    .json({ message: 'New home added successfully', home: newHome })
})

export const homeRoutes = router
