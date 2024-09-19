import { v2 as cloudinary } from 'cloudinary';
import '@/drizzle/envConfig';

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim();
const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY?.trim();
const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET?.trim();

if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
} else {
  console.warn('Cloudinary environment variables are not fully set');
}

export { cloudinary };