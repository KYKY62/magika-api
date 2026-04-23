import multer from "multer";

/**
 * Multer middleware configured for in-memory file storage.
 * Max file size: 50 MB.  Accepts up to 10 files per request.
 */
const storage = multer.memoryStorage();

export const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB
    files: 10,
  },
});
