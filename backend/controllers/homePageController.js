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

        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                if (file.fieldname === 'heroImage') {
                    if (!updates.hero) updates.hero = {};
                    updates.hero.image = file.path;
                } else if (file.fieldname.startsWith('brandLogo_')) {
                    const index = parseInt(file.fieldname.split('_')[1]);
                    if (updates.brands && updates.brands[index]) {
                        updates.brands[index].logo = file.path;
                    }
                }
            });
        }

        if (!homePage) {
            homePage = new HomePage(updates);
        } else {
            // Update fields manually to ensure Mongoose tracks changes
            if (updates.hero) homePage.hero = { ...homePage.hero.toObject(), ...updates.hero };
            if (updates.brands) homePage.brands = updates.brands;
            if (updates.issues) homePage.issues = updates.issues;
            if (updates.whyChooseUs) homePage.whyChooseUs = updates.whyChooseUs;
            if (updates.processSteps) homePage.processSteps = updates.processSteps;
            if (updates.trustStats) homePage.trustStats = updates.trustStats;
            if (updates.testimonials) homePage.testimonials = updates.testimonials;
            if (updates.seo) homePage.seo = updates.seo;
            if (updates.seoContent) homePage.seoContent = updates.seoContent;
        }

        await homePage.save();

        res.status(200).json({
            success: true,
            data: homePage
        });
    } catch (error) {
        console.error('Update Home Page Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update home page',
            error: error.message
        });
    }
};
