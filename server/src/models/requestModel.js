const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    course: { type:  Schema.Types.ObjectId, ref: 'courses' },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('requests', requestSchema);