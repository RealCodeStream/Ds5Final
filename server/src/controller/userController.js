const userService = require('../services/userService');

const registerController = async (req, res) => {
    try {
        const role = req.body.role;
        if (role !== 'Student' && role !== 'Professor') {
            return res.status(400).json({ message: 'Invalid role' });
        }
        const user = await userService.createUser(req.body, role);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginController = async (req, res) => {
    try {
        const { token, role } = await userService.loginUser(req.body);
        res.status(200).json({ token, role });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

const getAllProfessorsController = async (req, res) => {
    try {
        const professors = await userService.getAllProfessors();
        res.status(200).json(professors);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving professors' });
    }
};

module.exports = { registerController, loginController, getAllProfessorsController };