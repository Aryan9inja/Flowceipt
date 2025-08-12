import { cloudinary } from '../config/cloudinary';
import { Readable } from 'stream';

export const uploadToCloudinary = (buffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'receipt' },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error('Cloaudinary upload failed'));
        } else {
          resolve(result.secure_url);
        }
      }
    );

    const readable = Readable.from(buffer);
    readable.pipe(uploadStream);
  });
};
