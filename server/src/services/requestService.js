const Request = require('../models/requestModel');
const Course = require('../models/courseModel');

const createRequest = async (studentId, courseId) => {

    const existingRequest = await Request.findOne({ student: studentId, course: courseId });
    if (existingRequest) throw new Error('Request already exists');

    const request = new Request({ student: studentId, course: courseId });
    return await request.save();
};

const getRequestsForStudent = async () => {
    return await Request.find().populate('course', 'name')
    .populate('student', 'firstname lastname');
};

const updateRequestStatus = async (requestId, status) => {
    
    const request = await Request.findById(requestId);
    if (!request) throw new Error('Request not found');

    request.status = status;
    await request.save();

    if (status === 'Approved') {
        const course = await Course.findById(request.course);
        if (!course.enrolledStudents.includes(request.student)) {
            course.enrolledStudents.push(request.student);
            await course.save();
        }
    }

    return request;
};

module.exports = { createRequest, getRequestsForStudent, updateRequestStatus };