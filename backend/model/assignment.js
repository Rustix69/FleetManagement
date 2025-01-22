const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    assignmentId: {
        type: String,
        required: true,
        unique: true
    },
    vehicleId: {
        type: String,
        required: true,
        ref: 'Vehicle'
    },
    projectId: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['scheduled', 'active', 'completed'],
        default: 'scheduled'
    }
});

module.exports = mongoose.model('Assignment', assignmentSchema);