import multer from 'multer';

export const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File size is too large. Maximum allowed size is 2MB.' });
        }
    }
    next(err);
};