const express = require('express');
const router = express.Router();
const { getHomePage, updateHomePage } = require('../controllers/homePageController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../config/cloudinary');

router.route('/')
    .get(getHomePage)
    .put(protect, authorize('admin'), upload.single('heroImage'), updateHomePage);
// Note: If we need multiple image uploads (brands), we might need upload.fields() or separate endpoints.
// For simplicity, we'll start with Hero Image upload via this route, 
// and potentially handle Brand logos via a separate media manager or just URLs.

module.exports = router;
