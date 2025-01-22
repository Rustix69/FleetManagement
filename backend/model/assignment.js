const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  assignmentId: {
    type: String,
    required: true,
    unique: true
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Vehicle'
  },
  projectId: {
    type: String,
    required: true,
    unique: true
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return this.endDate && value < this.endDate;
      },
      message: 'Start date must be before end date.'
    }
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

// Indexing for efficient querying
assignmentSchema.index({ vehicleId: 1, projectId: 1 });

module.exports = mongoose.model('Assignment', assignmentSchema);
