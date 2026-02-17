const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const Category = require('../models/Category');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/questions
// @desc    Get all questions with filters
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { category, status, priority, page = 1, limit = 10 } = req.query;

        const query = {};
        if (category) query.category = category;
        if (status) query.status = status;
        if (priority) query.priority = priority;

        const questions = await Question.find(query)
            .populate('category', 'name slug')
            .populate('assignedExpert')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Question.countDocuments(query);

        res.status(200).json({
            success: true,
            count: questions.length,
            total: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            data: questions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   GET /api/questions/:id
// @desc    Get single question
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id)
            .populate('category', 'name slug')
            .populate('assignedExpert');

        if (!question) {
            return res.status(404).json({
                success: false,
                message: 'Question not found'
            });
        }

        res.status(200).json({
            success: true,
            data: question
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   POST /api/questions
// @desc    Submit new question
// @access  Public
router.post('/', async (req, res) => {
    try {
        const question = await Question.create(req.body);

        // Increment category question count
        await Category.findByIdAndUpdate(req.body.category, {
            $inc: { questionCount: 1 }
        });

        res.status(201).json({
            success: true,
            data: question
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   PUT /api/questions/:id
// @desc    Update question
// @access  Private (Expert/Admin)
router.put('/:id', protect, async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!question) {
            return res.status(404).json({
                success: false,
                message: 'Question not found'
            });
        }

        res.status(200).json({
            success: true,
            data: question
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   DELETE /api/questions/:id
// @desc    Delete question
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);

        if (!question) {
            return res.status(404).json({
                success: false,
                message: 'Question not found'
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
