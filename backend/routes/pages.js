const express = require('express');
const router = express.Router();
const {
    getPages,
    getPage,
    createPage,
    updatePage,
    deletePage
} = require('../controllers/pageController');

const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

router.route('/')
    .get(getPages)
    .post(protect, admin, createPage);

router.route('/:slug')
    .get(getPage);

router.route('/:id')
    .put(protect, admin, updatePage)
    .delete(protect, admin, deletePage);

module.exports = router;
