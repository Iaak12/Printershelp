const SiteSettings = require('../models/SiteSettings');

// @desc    Get Site Settings
// @route   GET /api/settings
// @access  Public
exports.getSettings = async (req, res, next) => {
    try {
        let settings = await SiteSettings.findOne();

        if (!settings) {
            // Create default settings if not exists
            console.log('No settings found in DB, creating defaults...');
            settings = await SiteSettings.create({});
        }

        res.status(200).json({
            success: true,
            data: settings
        });
    } catch (err) {
        console.error('Error fetching settings:', err);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Update Site Settings
// @route   PUT /api/settings
// @access  Private (Admin)
exports.updateSettings = async (req, res, next) => {
    try {
        console.log('DEBUG: Update Settings Request Body:', req.body);
        console.log('DEBUG: Update Settings Files:', req.files);

        let settings = await SiteSettings.findOne();

        // Parse data from multipart/form-data
        let updates = req.body.data;
        if (typeof updates === 'string') {
            try {
                updates = JSON.parse(updates);
            } catch (parseError) {
                console.error('DEBUG: JSON Parse Error for req.body.data:', parseError);
                return res.status(400).json({
                    success: false,
                    message: 'Invalid JSON data provided in fields'
                });
            }
        } else if (!updates) {
            // Fallback to direct req.body if 'data' field is missing
            updates = { ...req.body };
        }

        console.log('DEBUG: Resolved updates object:', updates);

        // Handle file uploads from multer (upload.fields)
        if (req.files) {
            if (req.files.headerLogo) {
                updates.headerLogo = req.files.headerLogo[0].path;
            }
            if (req.files.footerLogo) {
                updates.footerLogo = req.files.footerLogo[0].path;
            }
            if (req.files.favicon) {
                updates.favicon = req.files.favicon[0].path;
            }
        }

        if (!settings) {
            console.log('DEBUG: No settings document found, creating new one...');
            settings = await SiteSettings.create(updates);
        } else {
            console.log('DEBUG: Existing settings found, updating ID:', settings._id);
            settings = await SiteSettings.findByIdAndUpdate(settings._id, updates, {
                new: true,
                runValidators: true
            });
        }

        console.log('DEBUG: Update successful, returning settings');
        res.status(200).json({
            success: true,
            data: settings
        });
    } catch (err) {
        console.error('DEBUG: CRITICAL ERROR IN updateSettings:', err);
        res.status(500).json({
            success: false,
            message: err.message || 'Server Error'
        });
    }
};
