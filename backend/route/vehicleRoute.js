const express = require('express');
const router = express.Router();
const {
  createVehicle,
  getVehicleWithAssignments,
  updateVehicleStatus,
  getAllVehicles,
  getVehicleAvailability
} = require('../controller/vehicleController');

router.post('/', createVehicle);

router.get('/', getAllVehicles);

router.get('/:id', getVehicleWithAssignments);

router.patch('/:id/status', updateVehicleStatus);

router.get('/:id/availability', getVehicleAvailability);

module.exports = router;
