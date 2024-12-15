import express from 'express';
import { getAllUsers, deleteUser, updateUser } from '../controllers/userController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

export const userRoutes = express.Router();

userRoutes.get('/', authenticate, authorizeAdmin, getAllUsers);
userRoutes.delete('/:id', authenticate, authorizeAdmin, deleteUser);
userRoutes.put('/:id', authenticate, authorizeAdmin, updateUser);