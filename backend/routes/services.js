const express = require('express');
const router = express.Router();
const {
    getServices,
    getService,
    createService,
    updateService,
    deleteService
} = require('../controllers/serviceController');

const { protect, authorize } = require('../middleware/auth');
const upload = require('../config/cloudinary');

router.route('/')
    .get(getServices)
    .post(protect, authorize('admin'), upload.single('icon'), createService);

router.route('/:id')
    .get(getService)
    .put(protect, authorize('admin'), upload.single('icon'), updateService)
    .delete(protect, authorize('admin'), deleteService);

module.exports = router;
