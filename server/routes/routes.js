const express = require('express');
const { check } = require('express-validator');
const userController = require('../src/controller/userController');
const courseController = require('../src/controller/courseController');
const requestController = require('../src/controller/requestController');
const pdfController = require('../src/controller/pdfController');
const { authMiddleware, adminMiddleware } = require('../src/middleware/authMiddleware');
const router = express.Router();

// Validaciones
const validateRegister = [
    check('firstname').notEmpty().withMessage('Firstname is required'),
    check('lastname').notEmpty().withMessage('Lastname is required'),
    check('cedula').notEmpty().withMessage('Cedula is required'),
    check('email').isEmail().withMessage('Email is invalid'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('role').notEmpty().withMessage('Role is required')
];

// Validación para la creación de cursos
const validateCreateCourse = [
    check('name').notEmpty().withMessage('Course name is required'),
    check('level').notEmpty().withMessage('Course level is required'),
    check('language').notEmpty().withMessage('Language is required'),
    check('schedule').isArray().withMessage('Schedule must be an array')
];

const validateLogin = [
    check('firstname').notEmpty().withMessage('Firstname is required'),
    check('password').notEmpty().withMessage('Password is required')
];

// Rutas de Usuario
router.post('/register', validateRegister, userController.registerController);
router.post('/login', validateLogin, userController.loginController);
router.get('/professors', authMiddleware, userController.getAllProfessorsController);

// Rutas de Cursos
router.post('/courses/create', authMiddleware,validateCreateCourse ,courseController.createCourseController);
router.get('/courses', authMiddleware, courseController.getAllCoursesController);
router.patch('/courses/:courseId/status', authMiddleware, adminMiddleware, courseController.updateCourseStatusController);
router.get('/schedule', authMiddleware, courseController.getStudentScheduleController);

// Rutas de Solicitudes
router.post('/requests/create', authMiddleware, requestController.createRequestController);
router.get('/requests/student', authMiddleware, adminMiddleware,requestController.getRequestsForStudentController);
router.patch('/requests/:requestId/status', authMiddleware, adminMiddleware, requestController.updateRequestStatusController);

// Rutas de PDF
router.get('/download/schedule', authMiddleware, pdfController.downloadSchedulePDFController);

module.exports = router;