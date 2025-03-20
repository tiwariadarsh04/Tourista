import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/review.js';
import bookingRoute from './routes/bookings.js';

dotenv.config();

const MONGO_URI = "mongodb://localhost:27017/tourista"; // Updated URI
const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: true,
    credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/tours', tourRoute);
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/review', reviewRoute);
app.use('/api/bookings', bookingRoute);

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the server after successful connection
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });