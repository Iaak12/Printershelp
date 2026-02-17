const mongoose = require('mongoose');
const slugify = require('slugify');

const ServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a service title'],
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        unique: true
    },
    icon: {
        type: String, // Cloudinary URL
        default: 'default-icon.png'
    },
    shortDescription: {
        type: String,
        required: [true, 'Please add a short description'],
        maxlength: [200, 'Description can not be more than 200 characters']
    },
    content: {
        type: String,
        required: [true, 'Please add service content']
    },
    seo: {
        metaTitle: String,
        metaDescription: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create slug from name
ServiceSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true });
    }
    next();
});

module.exports = mongoose.model('Service', ServiceSchema);
