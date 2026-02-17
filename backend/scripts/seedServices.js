const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('../models/Service');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const services = [
    { title: 'Printer Offline Issues', path: '/services/printer-offline', description: 'Fix printer appearing offline on Windows or Mac.' },
    { title: 'Printer Not Printing', path: '/services/printer-not-printing', description: 'Resolve issues where printer is connected but not printing.' },
    { title: 'Wireless / WiFi Printer Setup', path: '/services/wireless-setup', description: 'Assistance with connecting your printer to WiFi network.' },
    { title: 'Printer Driver & Software Issues', path: '/services/driver-issues', description: 'Fix corrupted drivers or installation errors.' },
    { title: 'Printer Paper Jam Issues', path: '/services/paper-jam', description: 'Safe removal of jammed paper and prevention tips.' },
    { title: 'Printer Scanner Not Working', path: '/services/scanner-issues', description: 'Troubleshoot scanner connection and quality issues.' },
    { title: 'Printer Error Codes', path: '/services/error-codes', description: 'Decipher and fix common printer error codes.' },
    { title: 'Printer Installation & Setup', path: '/services/installation', description: 'Complete step-by-step installation guide.' }
];

const seedServices = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        await Service.deleteMany();

        for (const service of services) {
            await Service.create({
                title: service.title,
                shortDescription: service.description,
                content: `<h1>${service.title}</h1><p>Welcome to our comprehensive guide for ${service.title}.</p><p>Our certified experts are here to help you resolve this issue quickly.</p>`,
                seo: {
                    metaTitle: `${service.title} - Printer Support`,
                    metaDescription: `Expert help for ${service.title}. Call us now.`
                }
            });
        }

        console.log('Services Seeded Successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedServices();
