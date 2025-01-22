const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  assetId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  type: String,
  model: String,
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
  }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
