const express = require('express');
const router = express.Router();
const { getHomePage, updateHomePage } = require('../controllers/homePageController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../config/cloudinary');

const uploadAny = (req, res, next) => {
    upload.any()(req, res, (err) => {
        if (err) {
            console.error('Multer Upload Error:', err);
            return res.status(400).json({
                success: false,
                message: err.message || 'File upload error',
                code: err.code
            });
        }
        next();
    });
};

router.route('/')
    .get(getHomePage)
    .put(protect, authorize('admin'), uploadAny, updateHomePage);
// Note: If we need multiple image uploads (brands), we might need upload.fields() or separate endpoints.
// For simplicity, we'll start with Hero Image upload via this route, 
// and potentially handle Brand logos via a separate media manager or just URLs.

module.exports = router;
