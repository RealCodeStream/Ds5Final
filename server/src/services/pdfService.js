const PDFDocument = require('pdfkit');
const Course = require('../models/courseModel');
const fs = require('fs');
const path = require('path');
const os = require('os');

const generateSchedulePDF = async (userId, role) => {

    // Ruta al directorio de Descargas
    const downloadsDir = path.join(os.homedir(), 'Downloads');

    const filePath = path.join(downloadsDir, `Horario.pdf`);
    const stream = fs.createWriteStream(filePath);
    const doc = new PDFDocument();

    doc.pipe(stream);
    doc.fontSize(25).text(`Horario de ${role}`, { align: 'center' });

    let courses;
    if (role === 'Professor') {
        courses = await Course.find({ professor: userId }).populate('enrolledStudents', 'firstname lastname');
    } else if (role === 'Student') {
        courses = await Course.find({ enrolledStudents: userId }).populate('professor', 'firstname lastname');
    }

    courses.forEach(course => {
        doc.addPage();
        doc.fontSize(20).text(course.name, { align: 'center' });
        doc.fontSize(15).text(`Language: ${course.language}`, { align: 'center' });
        doc.text(`Level: ${course.level}`, { align: 'center' });
        doc.text(`Status: ${course.status}`, { align: 'center' });
        doc.text(`Professor: ${course.professor.firstname} ${course.professor.lastname}`, { align: 'center' });

        doc.text('\nHorario:', { align: 'center' });
        course.schedule.forEach(s => {
            doc.text(`${s.day}: ${s.time}`, { align: 'center' });
        });

        if (role === 'Professor') {
            doc.text('\nEnrolled Students:', { align: 'center' });
            course.enrolledStudents.forEach(student => {
                doc.text(`${student.firstname} ${student.lastname}`, { align: 'center' });
            });
        }
    });

    doc.end();
    return new Promise((resolve, reject) => {
        stream.on('finish', () => resolve(filePath));
        stream.on('error', reject);
    });
};

module.exports = { generateSchedulePDF };