const express = require('express');
const router = express.Router();
const Fleet = require('../model/fleet');
const {
  createFleet,
  getFleetDetails,
  addAssetToFleet,
  updateFleetStatus,
  addAssignmentToFleet
} = require('../controller/fleetController');
const authenticateToken = require('../authMiddleware');


router.post('/',authenticateToken, createFleet);

router.get('/:id', getFleetDetails);

router.post('/:fleetId/assets', addAssetToFleet);

router.post('/:fleetId/assignments', addAssignmentToFleet);

router.patch('/:fleetId/status', updateFleetStatus);

router.get('/', async (req, res) => {
  try {
    const fleets = await Fleet.find();
    res.status(200).json({
      success: true,
      count: fleets.length,
      data: fleets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
