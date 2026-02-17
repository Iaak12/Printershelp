const mongoose = require('mongoose');
const dotenv = require('dotenv');
const HomePage = require('../models/HomePage');

const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const seedHomePage = async () => {
    try {
        await HomePage.deleteMany();

        const homeData = {
            hero: {
                title: 'Trusted Printer Support for All Major Brands',
                subtitle: 'Fix printer offline, WiFi, installation, driver and printing issues with certified technical experts.',
                description: 'We provide guided assistance for common and advanced printer problems across HP, Canon, Epson, and Brother printers.',
                buttonText: 'Get Instant Help',
                image: '/images/printer-hero.png' // Placeholder for now
            },
            brands: [
                { name: 'HP', logo: '/images/brands/hp.png' },
                { name: 'Canon', logo: '/images/brands/canon.png' },
                { name: 'Epson', logo: '/images/brands/epson.png' },
                { name: 'Brother', logo: '/images/brands/brother.png' }
            ],
            issues: [
                { title: 'Printer Offline Issues', path: '/services/printer-offline' },
                { title: 'Printer Not Printing', path: '/services/printer-not-printing' },
                { title: 'Wireless / WiFi Printer Setup', path: '/services/wireless-setup' },
                { title: 'Printer Driver & Software Issues', path: '/services/driver-issues' },
                { title: 'Printer Paper Jam Issues', path: '/services/paper-jam' },
                { title: 'Printer Scanner Not Working', path: '/services/scanner-issues' },
                { title: 'Printer Error Codes', path: '/services/error-codes' },
                { title: 'Printer Installation & Setup', path: '/services/installation' }
            ],
            whyChooseUs: [
                {
                    title: 'Certified Technical Experts',
                    description: 'Our support team consists of trained and certified technical experts experienced in handling printer issues across multiple brands and models.',
                    icon: 'FaCertificate'
                },
                {
                    title: 'Brand-Specific Expertise',
                    description: 'We understand printer configurations, drivers, error codes, and connectivity issues specific to each brand.',
                    icon: 'FaShieldAlt'
                },
                {
                    title: 'Structured Support Process',
                    description: 'Every issue is handled through a step-by-step troubleshooting approach for accurate and reliable resolution.',
                    icon: 'FaCheckCircle'
                },
                {
                    title: 'Secure & Trusted Assistance',
                    description: 'User information is handled securely and used only to assist with support queries.',
                    icon: 'FaHeadset'
                }
            ],
            processSteps: [
                { stepNumber: 1, title: 'Select your printer issue' },
                { stepNumber: 2, title: 'AI Assistant analyzes the problem' },
                { stepNumber: 3, title: 'Connect with a certified expert' },
                { stepNumber: 4, title: 'Receive guided troubleshooting support' }
            ],
            trustStats: {
                experience: { title: 'Experience', description: 'Resolving a wide range of printer problems across home and office environments.' },
                multiBrand: { title: 'Multi-Brand', description: 'Support for HP, Canon, Epson, Brother, and other major printer brands.' },
                professional: { title: 'Professional', description: 'Structured, secure, and expert-guided troubleshooting process.' }
            },
            testimonials: [
                { name: 'Braden Summers', company: 'Reviewed for Dell', review: 'Superb Service! Highly skilled and trustworthy. I\'ve relied on their services for years.', stars: 5 },
                { name: 'Ezra Walls', company: 'Reviewed for Konica Minolta', review: '24/7 support is amazing. I can focus on my business instead of fixing printer issues.', stars: 5 },
                { name: 'Jared James', company: 'Reviewed for Xerox', review: 'Friendly technicians who really know printers. Fast response and smooth support.', stars: 5 }
            ]
        };

        await HomePage.create(homeData);
        console.log('Home Page Seeding Complete!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedHomePage();
