const requestService = require('../services/requestService');

const createRequestController = async (req, res) => {
    try {
        const studentId = req.user.userId;
        const {courseId} = req.body;
        const request = await requestService.createRequest(studentId, courseId);
        res.status(201).json(request);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getRequestsForStudentController = async (req, res) => {
    try {
        const requests = await requestService.getRequestsForStudent();
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving requests' });
    }
};

const updateRequestStatusController = async (req, res) => {
    try {
        const requestId = req.params.requestId;
        const { status } = req.body;
        const updatedRequest = await requestService.updateRequestStatus(requestId, status);
        res.status(200).json(updatedRequest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createRequestController, getRequestsForStudentController, updateRequestStatusController };