const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (userData, role) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({ ...userData, password: hashedPassword, role });
    return await user.save();
};

const loginUser = async ({ firstname, password }) => {
    const user = await User.findOne({ firstname });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, 'SECRET_KEY', { expiresIn: '48h' });
    return { token, role: user.role };
};

const getAllProfessors = async () => {
    return await User.find({ role: 'Professor' });
};

module.exports = { createUser, loginUser, getAllProfessors };