const express = require('express');
const router = express.Router();
const Expert = require('../models/Expert');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/experts
// @desc    Get all experts
// @access  Public
router.get('/', async (req, res) => {
    try {
        const experts = await Expert.find()
            .populate('userId', 'name email')
            .populate('specializations', 'name slug')
            .sort({ rating: -1 });

        res.status(200).json({
            success: true,
            count: experts.length,
            data: experts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   GET /api/experts/online
// @desc    Get online experts count
// @access  Public
router.get('/online', async (req, res) => {
    try {
        const count = await Expert.countDocuments({ isOnline: true });

        res.status(200).json({
            success: true,
            data: { onlineCount: count }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   GET /api/experts/:id
// @desc    Get single expert
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const expert = await Expert.findById(req.params.id)
            .populate('userId', 'name email')
            .populate('specializations', 'name slug');

        if (!expert) {
            return res.status(404).json({
                success: false,
                message: 'Expert not found'
            });
        }

        res.status(200).json({
            success: true,
            data: expert
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   POST /api/experts
// @desc    Create expert profile
// @access  Private/Admin
router.post('/', protect, authorize('admin'), async (req, res) => {
    try {
        const expert = await Expert.create(req.body);

        res.status(201).json({
            success: true,
            data: expert
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   PUT /api/experts/:id
// @desc    Update expert profile
// @access  Private (Expert/Admin)
router.put('/:id', protect, async (req, res) => {
    try {
        const expert = await Expert.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!expert) {
            return res.status(404).json({
                success: false,
                message: 'Expert not found'
            });
        }

        res.status(200).json({
            success: true,
            data: expert
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   PATCH /api/experts/:id/status
// @desc    Update expert online status
// @access  Private (Expert/Admin)
router.patch('/:id/status', protect, async (req, res) => {
    try {
        const { isOnline } = req.body;

        const expert = await Expert.findByIdAndUpdate(
            req.params.id,
            { isOnline },
            { new: true }
        );

        if (!expert) {
            return res.status(404).json({
                success: false,
                message: 'Expert not found'
            });
        }

        res.status(200).json({
            success: true,
            data: expert
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   DELETE /api/experts/:id
// @desc    Delete expert
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
    try {
        const expert = await Expert.findByIdAndDelete(req.params.id);

        if (!expert) {
            return res.status(404).json({
                success: false,
                message: 'Expert not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
