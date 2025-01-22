const Assignment = require('../model/assignment');
const Vehicle = require('../model/vehicle');

exports.createAssignment = async (req, res) => {
    try {
        
        const vehicle = await Vehicle.findOne({ assetId: req.body.vehicleId });
        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found'
            });
        }

        const assignment = new Assignment({
            assignmentId: req.body.assignmentId,
            vehicleId: req.body.vehicleId, 
            projectId: req.body.projectId,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        });

        await assignment.save();
        res.status(201).json({ success: true, data: assignment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
