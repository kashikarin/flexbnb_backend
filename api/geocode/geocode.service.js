async function reverseGeocode(lat, lng) {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_API_KEY}`
    )

    const data = await response.json()

    if (data.results && data.results.length > 0) {
      const addressComponents = data.results[0].address_components

      const city = addressComponents.find(
        (component) =>
          component.types.includes('locality') ||
          component.types.includes('administrative_area_level_1')
      )

      const country = addressComponents.find((component) =>
        component.types.includes('country')
      )

      return {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        address: data.results[0].formatted_address,
        city: city?.long_name || 'Unknown',
        countryCode: country?.short_name || 'Unknown',
        country: country?.long_name || 'Unknown',
      }
    } else {
      return {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        address: 'Unknown',
        city: 'Unknown',
        country: 'Unknown',
        countryCode: 'Unknown',
      }
    }
  } catch (error) {
    console.error('Geocoding service error:', error)
    throw new Error('Failed to fetch geocoding data')
  }
}
export default {
  reverseGeocode,
}
