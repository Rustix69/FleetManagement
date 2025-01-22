const express = require('express');
const router = express.Router();
const {
  createFleet,
  getFleetDetails,
  addAssetToFleet,
  updateFleetStatus
} = require('../controller/fleetController');


router.post('/', createFleet);
router.get('/:id', getFleetDetails);
router.post('/:fleetId/assets', addAssetToFleet);
router.patch('/:fleetId/status', updateFleetStatus);

module.exports = router;
