const courseService = require('../services/courseService');


const createCourseController = async (req, res) => {
    try {
         const courseDetails = { ...req.body, professor: req.user.userId };
        const course = await courseService.createCourse(courseDetails);
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllCoursesController = async (req, res) => {
    try {
        const courses = await courseService.getAllCourses();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving courses' });
    }
};

const updateCourseStatusController = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { status } = req.body;
        const updatedCourse = await courseService.updateCourseStatus(courseId, status);

        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: 'Error updating course status', error: error.message });
    }
};

const getStudentScheduleController = async (req, res) => {
    try {
        const studentId = req.user.userId; 
        const calendarData = await calendarService.getStudentSchedule(studentId);
        res.status(200).json(calendarData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports =  {
    createCourseController,
     getAllCoursesController, 
     updateCourseStatusController, 
     getStudentScheduleController} ;