const Fleet = require('../model/fleet');
const Vehicle = require('../model/vehicle');
const Assignment = require('../model/assignment');

// Create Fleet
exports.createFleet = async (req, res) => {
    try {
        const fleet = new Fleet({
            fleetId: req.body.fleetId,
            name: req.body.name,
            description: req.body.description
        });
        await fleet.save();
        res.status(201).json({ success: true, data: fleet });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get Fleet Details
exports.getFleetDetails = async (req, res) => {
    try {
        const fleetId = req.params.id.toUpperCase(); 
        
        const fleet = await Fleet.findOne({ fleetId: fleetId })
            .populate('assets', 'assetId type model status')
            .populate('assignments', 'assignmentId vehicleId startDate endDate status');

        if (!fleet) {
            return res.status(404).json({ success: false, message: 'Fleet not found' });
        }

        res.status(200).json({ success: true, data: fleet });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


// Add Vehicle to Fleet
exports.addAssetToFleet = async (req, res) => {
    try {
        const { fleetId } = req.params;
        const { assetId } = req.body;

        const asset = await Vehicle.findOne({ assetId });
        if (!asset) {
            return res.status(404).json({ success: false, message: 'Asset not found' });
        }

        const fleet = await Fleet.findOneAndUpdate(
            { fleetId: fleetId.toUpperCase() },
            { $addToSet: { assets: asset._id } },
            { new: true }
        );

        if (!fleet) {
            return res.status(404).json({ success: false, message: 'Fleet not found' });
        }

        res.status(200).json({ success: true, data: fleet });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Add Assignment to Fleet
exports.addAssignmentToFleet = async (req, res) => {
    try {
        const { fleetId } = req.params;
        const { assignmentId } = req.body;

        const assignment = await Assignment.findOne({ assignmentId });
        if (!assignment) {
            return res.status(404).json({ success: false, message: 'Assignment not found' });
        }

        const fleet = await Fleet.findOneAndUpdate(
            { fleetId: fleetId.toUpperCase() },
            { $addToSet: { assignments: assignment._id } },
            { new: true }
        );

        if (!fleet) {
            return res.status(404).json({ success: false, message: 'Fleet not found' });
        }

        res.status(200).json({ success: true, data: fleet });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update Fleet Status
exports.updateFleetStatus = async (req, res) => {
    try {
        const { fleetId } = req.params;
        const { status } = req.body;

        const fleet = await Fleet.findOneAndUpdate(
            { fleetId: fleetId.toUpperCase() },
            { status, lastUpdated: Date.now() },
            { new: true }
        );

        if (!fleet) {
            return res.status(404).json({ success: false, message: 'Fleet not found' });
        }

        res.status(200).json({ success: true, data: fleet });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};