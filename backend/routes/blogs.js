const express = require('express');
const router = express.Router();
const { getBlogs, getBlog, getBlogById, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../config/cloudinary');

router.route('/')
    .get(getBlogs)
    .post(protect, authorize('admin'), upload.single('image'), createBlog);

router.route('/:slug')
    .get(getBlog);

// Note: Update and Delete use ID, but Get Single uses Slug. 
// We need to be careful with route ordering if we use /:id and /:slug in same level.
// However, since we use different HTTP methods or need to disambiguate.
// Common pattern: /:id for PUT/DELETE, /slug/:slug for GET? Or just distinct.
// Mongoose IDs are hex strings. Slugs are usually dashed-strings.
// Let's use /:id for PUT/DELETE as strict ID match is safer.
// And /:slug for GET (if not found as ID, try slug). Or keep it simple.

router.route('/id/:id')
    .get(protect, authorize('admin'), getBlogById)
    .put(protect, authorize('admin'), upload.single('image'), updateBlog)
    .delete(protect, authorize('admin'), deleteBlog);

module.exports = router;
