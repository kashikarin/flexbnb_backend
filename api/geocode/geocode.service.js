async function reverseGeocode(lat, lng) {
 if (!process.env.GOOGLE_API_KEY) {
      console.error("❌ GOOGLE_API_KEY is missing or undefined!");
      throw new Error("Missing Google API Key in backend environment");
    }

    console.log("🔑 GOOGLE_API_KEY loaded in backend:", process.env.GOOGLE_API_KEY.slice(0, 5) + "..."); 

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_API_KEY}`;
    console.log("🌍 Sending request to:", url);
  try {
    const response = await fetch(url)
console.log('🔎 Response status from Google:', response.status)
    const data = await response.json()
console.log('📝 Full Google response:', JSON.stringify(data, null, 2))
    if (data.results && data.results.length > 0) {
      const addressComponents = data.results[0].address_components
      console.log('📍 addressComponents:', JSON.stringify(addressComponents, null, 2))

      const city = addressComponents.find(
        (component) =>
          component.types.includes('locality') ||
          component.types.includes('administrative_area_level_1') ||
          component.types.includes('postal_town') ||
          component.types.includes('administrative_area_level_2') 
      )

      const country = addressComponents.find((component) =>
        component.types.includes('country')
      )
      console.log('Google Geocode FULL response:', JSON.stringify(data, null, 2));

      return {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        address: data.results[0].formatted_address,
        city: city?.long_name || 'Unknown',
        countryCode: country?.short_name || 'Unknown',
        country: country?.long_name || 'Unknown',
      }
    } else {
      console.log('⚠️ No results found in Google response')
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
