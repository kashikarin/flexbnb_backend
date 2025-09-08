import { json } from 'express'
import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import { homeService } from './home.service.js'

export async function getHomes(req, res) {
  const { city, adults, children, pets, checkIn, checkOut } = req.query

  try {
    const filterBy = {
      city: city ?? '',
      capacity: (Number(adults) ?? 0) + (Number(children) ?? 0),
      pets: pets ?? '',
      checkIn: checkIn ?? '',
      checkOut: checkOut ?? '',
    }
    const homes = await homeService.query(filterBy)
    res.json(homes)
  } catch (err) {
    logger.error('Failed to get homes', err)
    res.status(400).send({ err: 'Failed to get homes' })
  }
}

export async function getHome(req, res) {
  const { homeId } = req.params
  try {
    const home = await homeService.getById(homeId)
    res.json(home)
  } catch (err) {
    logger.error(`Failed to get home by id ${homeId}`, err)
    console.error('GET /api/homes error:', err?.message, err?.stack)
    res.status(400).send({ err: 'Failed to get home' })
  }
}

export async function addHome(req, res) {
  const home = req.body
  try {
    const addedHome = await homeService.add(home)
    res.json(addedHome)
  } catch (err) {
    logger.error('Failed to add home', err)
    res.status(400).send({ err: 'Failed to add home' })
  }
}

export async function updateHome(req, res) {
  const home = req.body
  try {
    const updatedHome = await homeService.update(home)
    res.json(updatedHome)
  } catch (err) {
    logger.error('Failed to update home', err)
    res.status(400).send({ err: 'Failed to update home' })
  }
}

export async function removeHome(req, res){
    const homeId = req.params.homeId
    try {
        const removedId = await homeService.remove(homeId)
        res.json(removedId)
    } catch(err){
        logger.error('Failed to remove home', err)
        res.status(400).send({ err: 'Failed to remove home' })
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
