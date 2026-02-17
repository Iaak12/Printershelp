const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a question title'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a question description']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Please select a category']
    },
    userEmail: {
        type: String,
        required: [true, 'Please provide an email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    userName: {
        type: String,
        default: 'Anonymous'
    },
    status: {
        type: String,
        enum: ['pending', 'assigned', 'in-progress', 'resolved', 'closed'],
        default: 'pending'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    assignedExpert: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expert',
        default: null
    },
    response: {
        type: String,
        default: ''
    },
    responseDate: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Question', questionSchema);
