const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    day: { type: String, required: true },
    time: { type: String, required: true }
});

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    level: { type: String, required: true },
    language: { type: String, required: true },
    professor: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    schedule: [scheduleSchema],
    enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    status: { type: String, enum: ['Pending', 'Active', 'Cancelled'], default: 'Pending' }
});

module.exports = mongoose.model('courses', courseSchema);