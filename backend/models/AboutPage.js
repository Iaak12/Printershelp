const mongoose = require('mongoose');

const AboutPageSchema = new mongoose.Schema({
    hero: {
        title: { type: String, default: 'About Printer Support Services' },
        subtitle: { type: String, default: 'Professional printer support for all major brands' },
        image: { type: String, default: '' } // Cloudinary URL
    },
    mission: {
        title: { type: String, default: 'Our Commitment' },
        content: { type: String, default: 'We provide professional printer support services to help users resolve technical issues quickly and efficiently.' },
        image: { type: String, default: '' } // Cloudinary URL
    },
    features: [{
        title: { type: String },
        description: { type: String },
        icon: { type: String } // e.g. FaCertificate
    }],
    seo: {
        metaTitle: { type: String, default: 'About Us - Printer Support' },
        metaDescription: { type: String, default: 'Learn more about our certified printer support experts.' }
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('AboutPage', AboutPageSchema);
