const mongoose = require('mongoose');

const fleetSchema = new mongoose.Schema({
    fleetId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    assets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
    }],
    assignments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment'
    }],
    status: {
        type: String,
        enum: ['active', 'inactive', 'maintenance'],
        default: 'active'
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Fleet', fleetSchema);
