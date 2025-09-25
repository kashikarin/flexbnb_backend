import express from 'express'
import { getLocationByCoordinates } from './geocode.controller.js' 
const router = express.Router()

router.get('/', getLocationByCoordinates)

export default router
