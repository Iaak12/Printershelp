const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    brand: {
        type: String,
        required: [true, 'Please select a brand']
    },
    issue: {
        type: String,
        required: [true, 'Please select an issue']
    },
    message: {
        type: String,
        required: false
    },
    facedBefore: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'No'
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number']
    },
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Resolved'],
        default: 'New'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Inquiry', inquirySchema);
