const mongoose = require('mongoose');

const HomePageSchema = new mongoose.Schema({
    hero: {
        title: { type: String, default: 'Trusted Printer Support for All Major Brands' },
        subtitle: { type: String, default: 'Fix printer offline, WiFi, installation, driver and printing issues with certified technical experts.' },
        description: { type: String, default: 'We provide guided assistance for common and advanced printer problems across HP, Canon, Epson, and Brother printers.' },
        buttonText: { type: String, default: 'Get Instant Help' },
        image: { type: String, default: '' } // Cloudinary URL
    },
    brands: [{
        name: { type: String },
        logo: { type: String } // Cloudinary URL or local path
    }],
    issues: [{
        title: { type: String },
        path: { type: String }
    }],
    whyChooseUs: [{
        title: { type: String },
        description: { type: String },
        icon: { type: String } // Store icon name (e.g., 'FaCertificate')
    }],
    processSteps: [{
        stepNumber: { type: Number },
        title: { type: String }
    }],
    trustStats: {
        experience: { title: { type: String, default: 'Experience' }, description: { type: String } },
        multiBrand: { title: { type: String, default: 'Multi-Brand' }, description: { type: String } },
        professional: { title: { type: String, default: 'Professional' }, description: { type: String } }
    },
    testimonials: [{
        name: { type: String },
        company: { type: String },
        review: { type: String },
        stars: { type: Number, default: 5 }
    }],
    seo: {
        metaTitle: { type: String, default: 'Printer Support Services' },
        metaDescription: { type: String, default: 'Expert printer support services.' }
    },
    seoContent: {
        title: { type: String, default: '' },
        body: { type: String, default: '' }
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('HomePage', HomePageSchema);
