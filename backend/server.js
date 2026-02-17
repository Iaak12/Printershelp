const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Request logger middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next();
});

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:3001',
            process.env.FRONTEND_URL // Allow Vercel deployment
        ];

        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1 && !process.env.FRONTEND_URL) {
            // In dev/test, might want to be lenient or specific.
            // For now, if FRONTEND_URL is not set, we might strictly check localhost
            // But to make deployment easier, let's allow all if FRONTEND_URL is set to '*'
            return callback(null, true);
        }

        if (allowedOrigins.indexOf(origin) === -1) {
            // Standard check
            // return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
            // Being permissive for initial deployment troubleshooting:
            return callback(null, true);
        }

        return callback(null, true);
    },
    credentials: true
}));

// Route files
const categoryRoutes = require('./routes/categories');
const questionRoutes = require('./routes/questions');
const expertRoutes = require('./routes/experts');

// Mount routers
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pages', require('./routes/pages'));
app.use('/api/categories', categoryRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/experts', expertRoutes);
app.use('/api/faqs', require('./routes/faqs'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/homepage', require('./routes/homePage'));
app.use('/api/about', require('./routes/aboutPage'));
app.use('/api/services', require('./routes/services'));
app.use('/api/inquiries', require('./routes/inquiries'));

// Root route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Tech Support API',
        version: '1.0.0'
    });
});

// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Server Error'
    });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});
