const express = require('express');
const router = express.Router();
const { getFAQs, createFAQ, updateFAQ, deleteFAQ } = require('../controllers/faqController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(getFAQs)
    .post(protect, authorize('admin'), createFAQ);

router.route('/:id')
    .put(protect, authorize('admin'), updateFAQ)
    .delete(protect, authorize('admin'), deleteFAQ);

module.exports = router;
