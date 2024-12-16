import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
    try {
    const { role, id } = req.user; // Extract role and id from the authenticated user

    let users;
    if (role === 'SuperAdmin') {
        // SuperAdmin: Fetch all users and admins, exclude the caller
        users = await User.find({ _id: { $ne: id } }).select('-password');
    } else if (role === 'Admin') {
        // Admin: Fetch only users, exclude the caller
        users = await User.find({ _id: { $ne: id }, role: 'User' }).select('-password');
    } else {
        return res.status(403).json({ error: 'Access denied' });
    }
    res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
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