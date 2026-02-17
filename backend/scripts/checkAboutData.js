const mongoose = require('mongoose');
const dotenv = require('dotenv');
const AboutPage = require('../models/AboutPage');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const checkData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const data = await AboutPage.findOne();
        console.log('DATA CHECK:', data ? 'Found Data' : 'No Data');
        if (data) console.log(JSON.stringify(data, null, 2));
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkData();
