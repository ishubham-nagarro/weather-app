import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRoutes } from './src/routes/authRoutes.js';
import { userRoutes } from './src/routes/userRoutes.js';

const app = express();
const server = http.createServer(app)
dotenv.config()

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Successfully Connected to Mongo DB'))
    .catch(err => console.error('MongoDB connection error:', err));
  
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));