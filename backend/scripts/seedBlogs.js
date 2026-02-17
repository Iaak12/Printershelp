const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog = require('../models/Blog');

// Load env vars
dotenv.config(); // Looks for .env in current directory (backend)/scripts/

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
};

const blogs = [
    {
        title: 'How to Fix Printer Offline Issues',
        slug: 'fix-printer-offline',
        excerpt: 'Step-by-step guide to resolve common offline printer problems across all major brands...',
        image: '/images/blog/offline.png',
        author: 'Technical Support Team',
        content: `
      <p class="blog-intro">Printer offline issues usually occur due to network problems, outdated drivers, incorrect printer settings, or communication errors between your device and printer.</p>
      <h2>Step-by-Step Guide</h2>
      <ul class="blog-steps">
        <li>Restart your printer and WiFi router.</li>
        <li>Check printer status in Control Panel and remove offline mode.</li>
        <li>Set printer as default device.</li>
        <li>Update or reinstall the latest printer drivers.</li>
        <li>Reconnect printer to your WiFi network.</li>
      </ul>
      <p class="blog-conclusion">Most offline printer issues can be resolved using the steps above. If the issue continues, professional troubleshooting assistance may be required.</p>
    `
    },
    {
        title: 'WiFi Printer Setup Guide',
        slug: 'wifi-printer-setup-guide',
        excerpt: 'Complete guide to connecting your printer to wireless networks with troubleshooting tips...',
        image: '/images/blog/wifi.png',
        author: 'Technical Support Team',
        content: `
      <p class="blog-intro">Setting up a wireless printer allows you to print from multiple devices without cables. However, configuration issues can sometimes occur.</p>
      <h2>Step-by-Step Guide</h2>
      <ul class="blog-steps">
        <li>Turn on the printer and access network settings.</li>
        <li>Select your WiFi network from the list.</li>
        <li>Enter the correct WiFi password.</li>
        <li>Install printer drivers on your computer.</li>
        <li>Test print to confirm connection.</li>
      </ul>
      <p class="blog-conclusion">If your printer fails to connect to WiFi, reset network settings and try again or seek guided assistance.</p>
    `
    },
    {
        title: 'Understanding Printer Error Codes',
        slug: 'understanding-printer-error-codes',
        excerpt: 'Common printer error codes and what they mean for HP, Canon, Epson, and Brother printers...',
        image: '/images/blog/error.png',
        author: 'Technical Support Team',
        content: `
      <p class="blog-intro">Printer error codes indicate specific hardware or software issues. Understanding them helps resolve problems faster.</p>
      <h2>Step-by-Step Guide</h2>
      <ul class="blog-steps">
        <li>Check the error code displayed on your printer screen.</li>
        <li>Refer to the printer manual for explanation.</li>
        <li>Restart printer and clear print queue.</li>
        <li>Update drivers or firmware.</li>
        <li>Inspect for hardware issues like paper jam or low ink.</li>
      </ul>
      <p class="blog-conclusion">If error codes persist, expert support can help diagnose and resolve advanced technical issues.</p>
    `
    }
];

const importData = async () => {
    try {
        await connectDB();
        await Blog.deleteMany(); // Clear existing
        await Blog.create(blogs);
        console.log('Data Imported...');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

importData();
