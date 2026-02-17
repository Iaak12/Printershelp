const mongoose = require('mongoose');

const PageContentSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: [true, 'Please add a page slug'],
        unique: true,
        trim: true
    },
    title: {
        type: String,
        required: [true, 'Please add a page title'],
        trim: true
    },
    sections: {
        type: Map,
        of: String,
        default: {}
    },
    seoMetadata: {
        title: String,
        description: String,
        keywords: String
    },
    lastUpdatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('PageContent', PageContentSchema);
