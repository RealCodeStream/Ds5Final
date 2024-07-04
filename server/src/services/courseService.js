const Course = require('../models/courseModel');

const createCourse = async (courseDetails) => {
   try {
    const course = new Course({
        name: courseDetails.name,
        level: courseDetails.level,
        language: courseDetails.language,
        professor: courseDetails.professor,
        schedule: courseDetails.schedule,
        status: 'Pending'
    });
    return await course.save();
} catch (error) {
    console.error('Error creating course:', error);
    throw new Error('Unable to create course');
}
};

const getAllCourses = async () => {
    return await Course.find({ status: 'Approved', status: 'Pending' }).populate('professor', 'firstname lastname');
};

const updateCourseStatus = async (courseId, status) => {
    const course = await Course.findById(courseId);
    if (!course) {
        throw new Error('Course not found');
    }

    // Verificar numero de estudiantes inscritos
    const numStudents = course.enrolledStudents.length;

    // Reglas de aprobacion
    if (status === 'Approved' && numStudents < 11) {
        throw new Error('Course cannot be approved with less than 11 students');
    }

    course.status = status;
    return await course.save();
};

const getStudentSchedule = async (studentId) => {
    // Busca todos los cursos en los que el estudiante está inscrito
    const courses = await Course.find({ enrolledStudents: studentId });

    // Formatea los datos para que se ajusten a la estructura de un calendario
    const calendarData = {};

    courses.forEach(course => {
        course.schedule.forEach(schedule => {
            if (!calendarData[schedule.day]) {
                calendarData[schedule.day] = [];
            }
            calendarData[schedule.day].push({
                courseName: course.name,
                time: schedule.time,
                language: course.language,
                level: course.level,
                status: course.status
            });
        });
    });

    return calendarData;
};


module.exports = { createCourse, getAllCourses, updateCourseStatus, getStudentSchedule };