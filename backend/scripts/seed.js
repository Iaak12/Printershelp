const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Category = require('../models/Category');
const Expert = require('../models/Expert');
const Question = require('../models/Question');
const connectDB = require('../config/db');

dotenv.config();

connectDB();

const seedData = async () => {
    try {
        // Clear existing data
        await User.deleteMany();
        await Category.deleteMany();
        await Expert.deleteMany();
        await Question.deleteMany();

        console.log('Data cleared...');

        // Create admin user
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@printershelp.tech',
            password: 'admin@12printershelp.tech',
            role: 'admin'
        });

        // Create expert users
        const expert1 = await User.create({
            name: 'John Smith',
            email: 'john@techsupport.com',
            password: 'expert123',
            role: 'expert'
        });

        const expert2 = await User.create({
            name: 'Sarah Johnson',
            email: 'sarah@techsupport.com',
            password: 'expert123',
            role: 'expert'
        });

        console.log('Users created...');

        // Create categories
        const categories = await Category.insertMany([
            {
                name: 'Electronics',
                slug: 'electronics',
                description: 'General electronics support and troubleshooting',
                icon: 'FaMicrochip',
                questionCount: 0
            },
            {
                name: 'Computer',
                slug: 'computer',
                description: 'Desktop and laptop computer support',
                icon: 'FaDesktop',
                questionCount: 0
            },
            {
                name: 'Printers',
                slug: 'printers',
                description: 'Printer setup, troubleshooting, and maintenance',
                icon: 'FaPrint',
                questionCount: 0
            },
            {
                name: 'Cell Phones',
                slug: 'cell-phones',
                description: 'Mobile phone support and troubleshooting',
                icon: 'FaMobileAlt',
                questionCount: 0
            },
            {
                name: 'TV',
                slug: 'tv',
                description: 'Television repair and setup assistance',
                icon: 'FaTv',
                questionCount: 0
            },
            {
                name: 'Camera and Video',
                slug: 'camera-and-video',
                description: 'Camera and video equipment support',
                icon: 'FaCamera',
                questionCount: 0
            },
            {
                name: 'Computer Networking',
                slug: 'computer-networking',
                description: 'Network setup and troubleshooting',
                icon: 'FaNetworkWired',
                questionCount: 0
            },
            {
                name: 'Software',
                slug: 'software',
                description: 'Software installation and troubleshooting',
                icon: 'FaCode',
                questionCount: 0
            },
            {
                name: 'Laptop',
                slug: 'laptop',
                description: 'Laptop support and repair',
                icon: 'FaLaptop',
                questionCount: 0
            },
            {
                name: 'Game Systems',
                slug: 'game-systems',
                description: 'Gaming console support',
                icon: 'FaGamepad',
                questionCount: 0
            },
            {
                name: 'Home Theater-Stereo',
                slug: 'home-theater-stereo',
                description: 'Home entertainment system support',
                icon: 'FaVolumeUp',
                questionCount: 0
            },
            {
                name: 'Smartphones',
                slug: 'smartphones',
                description: 'Smartphone troubleshooting and support',
                icon: 'FaMobile',
                questionCount: 0
            }
        ]);

        console.log('Categories created...');

        // Create expert profiles
        const expertProfile1 = await Expert.create({
            userId: expert1._id,
            specializations: [categories[0]._id, categories[1]._id, categories[2]._id],
            bio: 'Certified tech expert with 10+ years of experience in electronics and computer repair.',
            rating: 4.8,
            totalQuestions: 245,
            resolvedQuestions: 230,
            isOnline: true,
            yearsOfExperience: 10
        });

        const expertProfile2 = await Expert.create({
            userId: expert2._id,
            specializations: [categories[3]._id, categories[4]._id, categories[11]._id],
            bio: 'Mobile and TV specialist with expertise in modern smart devices.',
            rating: 4.9,
            totalQuestions: 189,
            resolvedQuestions: 180,
            isOnline: true,
            yearsOfExperience: 7
        });

        console.log('Expert profiles created...');

        // Create sample questions
        await Question.insertMany([
            {
                title: 'Printer not connecting to WiFi',
                description: 'My HP printer cannot connect to my home WiFi network. I have tried resetting it multiple times.',
                category: categories[2]._id,
                userEmail: 'user1@example.com',
                userName: 'Mike Davis',
                status: 'pending',
                priority: 'medium'
            },
            {
                title: 'Laptop running very slow',
                description: 'My laptop has become extremely slow over the past week. It takes forever to start up.',
                category: categories[8]._id,
                userEmail: 'user2@example.com',
                userName: 'Emily Brown',
                status: 'assigned',
                priority: 'high',
                assignedExpert: expertProfile1._id
            },
            {
                title: 'iPhone screen not responding',
                description: 'The touchscreen on my iPhone 12 is not responding properly in certain areas.',
                category: categories[11]._id,
                userEmail: 'user3@example.com',
                userName: 'David Wilson',
                status: 'in-progress',
                priority: 'urgent',
                assignedExpert: expertProfile2._id
            }
        ]);

        console.log('Sample questions created...');

        console.log('✅ Database seeded successfully!');
        console.log('\nLogin credentials:');
        console.log('Admin - Email: admin@printershelp.tech, Password: admin@12printershelp.tech');
        console.log('Expert 1 - Email: john@techsupport.com, Password: expert123');
        console.log('Expert 2 - Email: sarah@techsupport.com, Password: expert123');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
