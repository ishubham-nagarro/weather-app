import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch users' });
    }
};

export const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Deletion failed' });
    }
};

export const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
      if (!updatedUser) return res.status(404).json({ error: 'User not found' });
      res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      res.status(500).json({ error: 'Update failed' });
    }
  };