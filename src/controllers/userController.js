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
      const { fullName, email, role } = req.body;
  
      // Input validation
      if (!fullName || fullName.trim() === '') {
          return res.status(400).json({ error: 'Name is required' });
      }
      if (!email || email.trim() === '') {
          return res.status(400).json({ error: 'Email is required' });
      }
      if (!role || !['Admin', 'User'].includes(role)) {
          return res.status(400).json({ error: 'Role is required and must be Admin or User' });
      }
  
      try {
          const { id } = req.params;
  
          // Restricting Admin to update only users, SuperAdmin can update Admin and Users
          if (req.user.role === 'Admin') {
              const targetUser = await User.findById(id);
              if (targetUser.role === 'Admin') {
                  return res.status(403).json({ error: 'Admins can only update Users, not other Admins' });
              }
          }
  
          const updatedUser = await User.findByIdAndUpdate(
              id,
              { fullName, email, role },
              { new: true, runValidators: true }
          );
  
          if (!updatedUser) {
              return res.status(404).json({ error: 'User not found' });
          }
  
          res.status(200).json({ message: 'User updated successfully', user: updatedUser });
      } catch (error) {
          res.status(500).json({ error: 'Could not update user' });
      }
  };