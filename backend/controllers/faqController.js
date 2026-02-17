const FAQ = require('../models/FAQ');

// @desc    Get all FAQs
// @route   GET /api/faqs
// @access  Public
exports.getFAQs = async (req, res, next) => {
    try {
        const faqs = await FAQ.find().sort({ order: 1, createdAt: -1 });

        res.status(200).json({
            success: true,
            count: faqs.length,
            data: faqs
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Create new FAQ
// @route   POST /api/faqs
// @access  Private (Admin)
exports.createFAQ = async (req, res, next) => {
    try {
        const faq = await FAQ.create(req.body);

        res.status(201).json({
            success: true,
            data: faq
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// @desc    Update FAQ
// @route   PUT /api/faqs/:id
// @access  Private (Admin)
exports.updateFAQ = async (req, res, next) => {
    try {
        let faq = await FAQ.findById(req.params.id);

        if (!faq) {
            return res.status(404).json({
                success: false,
                message: 'FAQ not found'
            });
        }

        faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: faq
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// @desc    Delete FAQ
// @route   DELETE /api/faqs/:id
// @access  Private (Admin)
exports.deleteFAQ = async (req, res, next) => {
    try {
        const faq = await FAQ.findById(req.params.id);

        if (!faq) {
            return res.status(404).json({
                success: false,
                message: 'FAQ not found'
            });
        }

        await faq.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};
