import express from 'express'
import { getLocationByCoordinates } from './geocode.controller.js' // ⬅️ שים לב לנקודה

const router = express.Router()

router.get('/', getLocationByCoordinates)

export default router
