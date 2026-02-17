const Blog = require('../models/Blog');

// @desc    Get all blog posts
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: blogs.length,
            data: blogs
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Get single blog post
// @route   GET /api/blogs/:slug
// @access  Public
exports.getBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        res.status(200).json({
            success: true,
            data: blog
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Get single blog post by ID
// @route   GET /api/blogs/id/:id
// @access  Private (Admin)
exports.getBlogById = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        res.status(200).json({
            success: true,
            data: blog
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Get single blog post by ID
// @route   GET /api/blogs/id/:id
// @access  Private (Admin)
exports.getBlogById = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        res.status(200).json({
            success: true,
            data: blog
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Create new blog post
// @route   POST /api/blogs
// @access  Private (Admin)
exports.createBlog = async (req, res, next) => {
    try {
        // Add image URL if uploaded
        if (req.file && req.file.path) {
            req.body.image = req.file.path;
        }

        const blog = await Blog.create(req.body);

        res.status(201).json({
            success: true,
            data: blog
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// @desc    Update blog post
// @route   PUT /api/blogs/:id
// @access  Private (Admin)
exports.updateBlog = async (req, res, next) => {
    try {
        console.log('Update Blog Request Body:', req.body);
        console.log('Update Blog Request File:', req.file);

        let blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        // Add image URL if uploaded
        if (req.file && req.file.path) {
            req.body.image = req.file.path;
            console.log('Image uploaded (Cloudinary URL):', req.file.path);
        } else {
            console.log('No new file uploaded. Keeping existing image or text input.');
        }

        blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        // Trigger save middleware to re-generate slug if title changed (optional, usually skipped on update unless explicit)
        // If we want to update slug too, we'd need to manually handle it or rely on plugin. 
        // For simplicity, we'll assume slug updates are handled if title updates, but findByIdAndUpdate doesn't trigger pre-save.
        // We'll leave it as is for now.

        res.status(200).json({
            success: true,
            data: blog
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// @desc    Delete blog post
// @route   DELETE /api/blogs/:id
// @access  Private (Admin)
exports.deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        await blog.deleteOne();

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
