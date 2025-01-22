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
    inventory: {
        totalAssets: {
            type: Number,
            default: 0
        },
        categories: [{
            type: {
                type: String,
                required: true
            },
            count: {
                type: Number,
                default: 0
            }
        }]
    },
    classification: {
        type: {
            type: String,
            enum: ['vehicles', 'machinery', 'equipment']
        },
        model: String,
        usageCategory: String
    },
    assets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
    }],
    status: {
        type: String,
        enum: ['active', 'inactive', 'maintenance'],
        default: 'active'
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Fleet', fleetSchema);
