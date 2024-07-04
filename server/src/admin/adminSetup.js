const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const createInitialAdmin = async () => {
    try {
        const userCount = await User.countDocuments();
        if (userCount === 0) {
            const hashedPassword = await bcrypt.hash('adminPassword', 10); 
            const admin = new User({
                firstname: 'joseth',
                lastname: 'pimentel',
                cedula: '4-822-1664',
                email: 'adminEmail@example.com',
                password: hashedPassword,
                role: 'Admin'
            });
            await admin.save();
            console.log("Admin user created.");
        } else {
            console.log("Admin user already exists.");
        }
    } catch (error) {
        console.error("Error creating admin user:", error);
    }
};

module.exports = createInitialAdmin;