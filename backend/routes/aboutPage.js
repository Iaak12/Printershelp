const express = require('express');
const router = express.Router();
const { getAboutPage, updateAboutPage } = require('../controllers/aboutPageController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../config/cloudinary'); // Cloudinary middleware

router.route('/')
    .get(getAboutPage)
    .put(protect, authorize('admin'),
        upload.fields([{ name: 'heroImage', maxCount: 1 }, { name: 'missionImage', maxCount: 1 }]),
        updateAboutPage);

module.exports = router;
