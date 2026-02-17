const AboutPage = require('../models/AboutPage');

// @desc    Get About Page Data
// @route   GET /api/about
// @access  Public
exports.getAboutPage = async (req, res, next) => {
    try {
        let aboutPage = await AboutPage.findOne();
        if (!aboutPage) {
            return res.status(404).json({ success: false, message: 'About Page data not found' });
        }
        res.status(200).json({ success: true, data: aboutPage });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update About Page Data
// @route   PUT /api/about
// @access  Private (Admin)
exports.updateAboutPage = async (req, res, next) => {
    try {
        let aboutPage = await AboutPage.findOne();

        // Parse JSON data if sent as string (FormData)
        let updates = req.body.data ? JSON.parse(req.body.data) : req.body;

        // Handle Image Uploads
        if (req.files) {
            if (req.files.heroImage) {
                if (!updates.hero) updates.hero = {};
                // Preserve existing fields if updates come partially, but typically frontend sends full object
                if (aboutPage && aboutPage.hero) {
                    updates.hero = { ...aboutPage.hero.toObject(), ...updates.hero, image: req.files.heroImage[0].path };
                } else {
                    updates.hero.image = req.files.heroImage[0].path;
                }
            }
            if (req.files.missionImage) {
                if (!updates.mission) updates.mission = {};
                if (aboutPage && aboutPage.mission) {
                    updates.mission = { ...aboutPage.mission.toObject(), ...updates.mission, image: req.files.missionImage[0].path };
                } else {
                    updates.mission.image = req.files.missionImage[0].path;
                }
            }
        }

        if (!aboutPage) {
            aboutPage = await AboutPage.create(updates);
        } else {
            aboutPage = await AboutPage.findByIdAndUpdate(aboutPage._id, updates, {
                new: true,
                runValidators: true
            });
        }

        res.status(200).json({ success: true, data: aboutPage });
    } catch (err) {
        console.error(err);
        res.status(400).json({ success: false, message: err.message });
    }
};
