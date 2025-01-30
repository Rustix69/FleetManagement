const express = require('express');
const router = express.Router();
const {
  createVehicle,
  getVehicleWithAssignments,
  updateVehicleStatus,
  getAllVehicles,
  getVehicleAvailability
} = require('../controller/vehicleController');
const authenticateToken = require('../authMiddleware');

router.post('/',authenticateToken ,createVehicle);

router.get('/', getAllVehicles);

router.get('/:id', getVehicleWithAssignments);

router.patch('/:id/status',authenticateToken ,updateVehicleStatus);

router.get('/:id/availability', getVehicleAvailability);

module.exports = router;
