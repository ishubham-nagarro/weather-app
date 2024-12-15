import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    // const token = req.header('Authorization');
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from header
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

export const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
};