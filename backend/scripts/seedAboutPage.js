const mongoose = require('mongoose');
const dotenv = require('dotenv');
const AboutPage = require('../models/AboutPage');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const seedAboutPage = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        await AboutPage.deleteMany();

        const aboutData = {
            hero: {
                title: 'About Printer Support Services',
                subtitle: 'Professional printer support for all major brands',
                image: ''
            },
            mission: {
                title: 'Our Commitment',
                content: 'We provide professional printer support services to help users resolve technical issues quickly and efficiently. Our team of certified experts specializes in troubleshooting and resolving printer problems across all major brands.',
                image: ''
            },
            features: [
                {
                    title: 'Certified Experts',
                    description: 'Our support team consists of trained and certified technical experts',
                    icon: 'FaCertificate'
                },
                {
                    title: 'Brand-Specific Knowledge',
                    description: 'Deep understanding of HP, Canon, Epson, and Brother printers',
                    icon: 'FaShieldAlt'
                },
                {
                    title: 'Professional Support',
                    description: 'Structured troubleshooting approach for reliable solutions',
                    icon: 'FaHeadset'
                },
                {
                    title: 'Secure Assistance',
                    description: 'Your information is handled securely and professionally',
                    icon: 'FaCheckCircle'
                }
            ],
            seo: {
                metaTitle: 'About Us - Printer Support',
                metaDescription: 'Learn more about our certified printer support experts.'
            }
        };

        await AboutPage.create(aboutData);
        console.log('About Page Seeding Complete!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAboutPage();
