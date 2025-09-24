console.log('🔧 Cloudinary Environment Check:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'MISSING!',
  api_key: process.env.CLOUDINARY_API_KEY || 'MISSING!',
  api_secret: process.env.CLOUDINARY_API_SECRET ? 'SET' : 'MISSING!',
})
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export const uploadService = {
  uploadImageFromUrl,
}

async function uploadImageFromUrl(imageUrl, publicId) {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      public_id: `profiles/${publicId}`,
      folder: 'user_profiles',
      transformation: [
        {
          width: 300,
          height: 300,
          crop: 'fill',
          gravity: 'face',
          quality: 'auto',
          format: 'webp',
        },
      ],
      overwrite: true,
      invalidate: true,
    })

    console.log('Image uploaded to Cloudinary:', result.public_id)
    return result.secure_url
  } catch (error) {
    console.error('Cloudinary upload failed:', error)
    throw new Error('Failed to upload image to Cloudinary')
  }
}
