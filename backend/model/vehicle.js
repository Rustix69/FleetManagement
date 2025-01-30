const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  assetId: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    enum: ['vehicle', 'equipment'],
    required: true
  },
  type: {
    type: String,
    required: true
  },
  modelNumber: {
    type: String,
    required: true
  },
  manufacturer: String,
  year: Number,
  assignments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment'
  }],
  status: {
    type: String,
    enum: ['available', 'assigned', 'maintenance'],
    default: 'available'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
