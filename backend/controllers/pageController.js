const PageContent = require('../models/PageContent');
const asyncHandler = require('express-async-handler');

// @desc    Get all pages (metadata only)
// @route   GET /api/pages
// @access  Public (or Admin only? - Public for menu generation if needed, but mostly admin)
// Let's make it public but lightweight
exports.getPages = asyncHandler(async (req, res) => {
    const pages = await PageContent.find().select('slug title seoMetadata updatedAt');
    res.status(200).json({ success: true, count: pages.length, data: pages });
});

// @desc    Get single page by slug
// @route   GET /api/pages/:slug
// @access  Public
exports.getPage = asyncHandler(async (req, res) => {
    const page = await PageContent.findOne({ slug: req.params.slug });

    if (!page) {
        res.status(404);
        throw new Error('Page not found');
    }

    res.status(200).json({ success: true, data: page });
});

// @desc    Create new page
// @route   POST /api/pages
// @access  Private/Admin
exports.createPage = asyncHandler(async (req, res) => {
    // Check if page exists
    const pageExists = await PageContent.findOne({ slug: req.body.slug });
    if (pageExists) {
        res.status(400);
        throw new Error('Page with this slug already exists');
    }

    const page = await PageContent.create({
        ...req.body,
        lastUpdatedBy: req.user.id
    });

    res.status(201).json({ success: true, data: page });
});

// @desc    Update page
// @route   PUT /api/pages/:id
// @access  Private/Admin
exports.updatePage = asyncHandler(async (req, res) => {
    let page = await PageContent.findById(req.params.id);

    if (!page) {
        res.status(404);
        throw new Error('Page not found');
    }

    page = await PageContent.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    // Update lastUpdatedBy
    page.lastUpdatedBy = req.user.id;
    await page.save();

    res.status(200).json({ success: true, data: page });
});

// @desc    Delete page
// @route   DELETE /api/pages/:id
// @access  Private/Admin
exports.deletePage = asyncHandler(async (req, res) => {
    const page = await PageContent.findById(req.params.id);

    if (!page) {
        res.status(404);
        throw new Error('Page not found');
    }

    await page.deleteOne();

    res.status(200).json({ success: true, data: {} });
});
