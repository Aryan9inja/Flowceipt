import multer from 'multer';
import path from 'path';

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
  fileFilter(_req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (['.jpeg', '.jpg', '.png', '.webp'].includes(ext)) {
      cb(null, true);
    } else {
      cb(
        new Error('Only .jpeg, .jpg, .png and .webp image files are required')
      );
    }
  },
});
