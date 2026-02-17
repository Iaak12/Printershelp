const HomePage = require('../models/HomePage');
const Blog = require('../models/Blog');

// @desc    Get Home Page Data
// @route   GET /api/homepage
// @access  Public
exports.getHomePage = async (req, res, next) => {
    try {
        let homePage = await HomePage.findOne();

        // Fetch latest 3 blogs to include in home page data
        const latestBlogs = await Blog.find().sort({ createdAt: -1 }).limit(3);

        // If no data exists, return default empty structure or predefined defaults from Schema
        if (!homePage) {
            return res.status(404).json({ success: false, message: 'Home Page data not found' });
        }

        res.status(200).json({
            success: true,
            data: {
                ...homePage.toObject(),
                latestBlogs
            }
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Update Home Page Data
// @route   PUT /api/homepage
// @access  Private (Admin)
exports.updateHomePage = async (req, res, next) => {
    try {
        let homePage = await HomePage.findOne();

        // Parse the JSON data from frontend (because it's sent as FormData 'data' field)
        // If not sent as 'data' (i.e. old JSON request), fall back to req.body directly
        let updates = req.body.data ? JSON.parse(req.body.data) : req.body;

        if (req.file) {
            // Handle file upload for hero image
            // We need to ensure 'hero' object exists in updates before setting image
            if (!updates.hero) updates.hero = {};
            if (homePage && homePage.hero) {
                // Clean merge: keep existing hero data if not in updates (though frontend usually sends full object)
                updates.hero = { ...homePage.hero.toObject(), ...updates.hero, image: req.file.path };
            } else {
                updates.hero.image = req.file.path;
            }
        }

        if (!homePage) {
            homePage = await HomePage.create(updates);
        } else {
            homePage = await HomePage.findByIdAndUpdate(homePage._id, updates, {
                new: true,
                runValidators: true
            });
        }

        res.status(200).json({
            success: true,
            data: homePage
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};
