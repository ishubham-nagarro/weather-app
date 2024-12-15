import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    fullName: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'User'], default: 'User' },
}, { timestamps: true });


const User = model('User', userSchema);

export default User;
