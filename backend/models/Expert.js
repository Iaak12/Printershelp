const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    specializations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    bio: {
        type: String,
        default: ''
    },
    rating: {
        type: Number,
        default: 5.0,
        min: 0,
        max: 5
    },
    totalQuestions: {
        type: Number,
        default: 0
    },
    resolvedQuestions: {
        type: Number,
        default: 0
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: ''
    },
    yearsOfExperience: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Expert', expertSchema);
