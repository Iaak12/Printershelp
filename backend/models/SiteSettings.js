const mongoose = require('mongoose');

const SiteSettingsSchema = new mongoose.Schema({
    headerLogo: {
        type: String,
        default: ''
    },
    footerLogo: {
        type: String,
        default: ''
    },
    favicon: {
        type: String,
        default: ''
    },
    siteName: {
        type: String,
        default: 'Printer Support Services'
    },
    siteDescription: {
        type: String,
        default: 'Expert printer support services.'
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SiteSettings', SiteSettingsSchema);
