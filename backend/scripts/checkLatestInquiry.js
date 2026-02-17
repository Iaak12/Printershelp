const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Inquiry = require('../models/Inquiry');
const path = require('path');

// Safe path to .env in the parent directory (backend root)
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

const checkInquiries = async () => {
    try {
        console.log('Loading env from:', envPath);
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is undefined in .env file');
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const inquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(3);
        console.log('Latest 3 Inquiries:');
        inquiries.forEach(inq => {
            console.log('------------------------------------------------');
            console.log(`Name: ${inq.name}`);
            console.log(`Email: ${inq.email}`);
            console.log(`Phone: ${inq.phone}`);
            console.log(`Message: ${inq.message}`);
            console.log(`Brand: ${inq.brand}`);
            console.log(`Issue: ${inq.issue}`);
            console.log(`Created At: ${inq.createdAt}`);
        });

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkInquiries();
