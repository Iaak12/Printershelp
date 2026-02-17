const express = require('express');
const router = express.Router();
const { createInquiry, getInquiries, deleteInquiry } = require('../controllers/inquiryController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .post(createInquiry)
    .get(protect, authorize('admin'), getInquiries);

router.route('/:id')
    .delete(protect, authorize('admin'), deleteInquiry);

module.exports = router;
