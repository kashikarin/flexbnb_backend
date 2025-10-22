import geocodeService from './geocode.service.js'
export async function getLocationByCoordinates(req, res) {
  try {
    const { lat, lng } = req.query

    if (!lat || !lng) {
      return res.status(400).json({
        error: 'Missing lat or lng parameters',
      })
    }
    const locationData = await geocodeService.reverseGeocode(lat, lng)
    res.json(locationData)
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get location data',
    })
  }
}
