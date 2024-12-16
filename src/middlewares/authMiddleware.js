import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from header
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified.id); // Fetch user from DB
        if (!user) return res.status(404).json({ error: 'User not found' });

        req.user = { id: user._id, role: user.role }; // Attach user details to request
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(400).json({ error: 'Invalid token' });
    }
};

export const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'SuperAdmin' && req.user.role !== 'Admin') {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
};