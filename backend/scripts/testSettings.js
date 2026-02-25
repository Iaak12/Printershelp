const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const SiteSettings = require('../models/SiteSettings');

const test = async () => {
    try {
        console.log('Connecting to DB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected!');

        console.log('Fetching settings...');
        let settings = await SiteSettings.findOne();
        if (!settings) {
            console.log('No settings found, creating defaults...');
            settings = await SiteSettings.create({});
        }
        console.log('Settings:', settings);

        await mongoose.connection.close();
        console.log('Done!');
    } catch (err) {
        console.error('Test Failed:', err);
        process.exit(1);
    }
};

test();
