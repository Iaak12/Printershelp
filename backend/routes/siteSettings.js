const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/siteSettingsController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');
const upload = require('../config/cloudinary');

router.route('/')
    .get(getSettings)
    .put(
        protect,
        admin,
        upload.fields([
            { name: 'headerLogo', maxCount: 1 },
            { name: 'footerLogo', maxCount: 1 },
            { name: 'favicon', maxCount: 1 }
        ]),
        updateSettings
    );

module.exports = router;
