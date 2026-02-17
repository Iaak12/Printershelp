const mongoose = require('mongoose');
const slugify = require('slugify');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title can not be more than 100 characters']
    },
    slug: {
        type: String,
        unique: true
    },
    excerpt: {
        type: String,
        required: [true, 'Please add an excerpt'],
        maxlength: [200, 'Excerpt can not be more than 200 characters']
    },
    content: {
        type: String,
        required: [true, 'Please add content']
    },
    image: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        default: 'Admin'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create blog slug from the name
BlogSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

module.exports = mongoose.model('Blog', BlogSchema);
