import { dbService } from "../../services/db.service.js"
import { logger } from "../../services/logger.service.js"
import { homeService } from "./home.service.js"

export async function getHomes(req, res){
//   const homes = [
//     {
//       _id: 'jE9dy3',
//       name: '. . a dead channel ',
//       type: 'Guesthouse',
//       summary:
//         'in such cases to from various people as generally above a pleasure the color of television and and I this happened It . more or less in such cases It . a pleasure to had was above . the color of television it above was a pleasure a different story above bit by bit was from various people burn more or less bit by bit tuned from various people the story bit by bit more or less from various people more or less All happens a dead channel in such cases tuned the port . a different story each time from various people was . each time All I It had in such cases a different story each time and . as generally in such cases was It in such cases bit by bit I was from various people each time burn the color of television was . was each time the color of television was it . was was burn as generally All from various people had it a different story above was it happens to to was tuned the story was this happened had it was was bit by bit the port in such cases a dead channel . . in such cases and it to a pleasure was it a pleasure . . . more or less above was above to this happened to tuned . it a dead channel the color of television and from various people . it from various people it and as generally and the port to a dead channel in such cases was more or less All happens had as generally as generally . and bit by bit had to in such cases above bit by bit The sky . the port I The sky this happened . more or less I each time was . ',
//       price: 1530,
//       capacity: 7,
//       petsAllowed: true,
//       bedRoomsCount: 3,
//       bedsCount: 4,
//       bathCount: 2,

//       amenities: [
//         'Cooking basics',
//         'Kitchen',
//         'Wifi',
//         'Piano',
//         'Balcony',
//         'Pets allowed',
//         'Gym',
//         'Heating',
//         'Pool',
//       ],

//       availableDates: [
//         { startDate: '2025-09-23', endDate: '2025-11-12' },
//         { startDate: '2025-12-06', endDate: '2026-01-03' },
//       ],

//       bookings: [
//         { start: '2025-09-13T15:26:26.990Z', end: '2025-09-17T15:26:26.990Z' },
//       ],

//       host: {
//         _id: 'u101',
//         fullname: 'Justin Time',
//         imageURL: '/img/user/justin-img.jpg',
//       },

//       imageUrls: [
//         'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436453/ndl8odasqgnyquvsbalp.jpg',
//       ],

//       labels: ['Top of the world', null],
//       likedByUsers: [],
//       reviews: [],

//       loc: {
//         country: 'Israel',
//         countryCode: 'IL',
//         city: 'Tel Aviv-Yafo',
//         lat: 32.116403,
//         lng: 34.779574,
//       },
//     },
//   ]

  // res.status(400)
  // throw new Error('This is a forced error')
    const {city, adults, children, pets, checkIn, checkOut} = req.query 
  
  try {
    const filterBy = {
            city: city ?? '',
            capacity: (Number(adults) ?? 0 ) + (Number(children) ?? 0),
            pets: pets ?? '',
            checkIn: checkIn ?? '',
            checkOut: checkOut ?? ''
    }     
    const homes = await homeService.query(filterBy)
    res.json(homes)
    } catch(err) {
        logger.error('Failed to get homes', err)
        res.status(400).send({ err: 'Failed to get homes' })
    }
}

export async function getHome(req, res){
    const {homeId} = req.params
    try{
        const home = await homeService.getById(homeId)
        res.json(home)
    }catch(err) {
        logger.error(`Failed to get home by id ${homeId}`, err)
        res.status(400).send({ err: 'Failed to get homes' })
    }
}