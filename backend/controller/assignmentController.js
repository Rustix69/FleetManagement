const Assignment = require('../model/assignment');
const Vehicle = require('../model/vehicle');

// Create a new assignment
exports.createAssignment = async (req, res) => {
    try {
        const { vehicleId, assignmentId, projectId, startDate, endDate } = req.body;

        // Find the vehicle by assetId
        const vehicle = await Vehicle.findOne({ assetId: vehicleId });
        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found'
            });
        }

        // Check if the vehicle is available during the requested date range
        const conflictingAssignment = await Assignment.findOne({
            vehicleId: vehicle._id,
            $or: [
                {
                    startDate: { $lte: new Date(endDate) },
                    endDate: { $gte: new Date(startDate) }
                }
            ]
        });

        if (conflictingAssignment) {
            return res.status(400).json({
                success: false,
                message: 'Vehicle is not available for the selected date range'
            });
        }

        // Create a new assignment
        const assignment = new Assignment({
            assignmentId,
            vehicleId: vehicle._id, 
            projectId,
            startDate,
            endDate,
            createdBy: req.user.userId
        });

       
        await assignment.save();

        // Update the vehicle's status to 'assigned'
        vehicle.status = 'assigned';
        vehicle.assignments.push(assignment._id); 
        await vehicle.save();

        res.status(201).json({ success: true, data: assignment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get all assignments
exports.getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find().populate('vehicleId', 'assetId modelNumber');
        res.status(200).json({
            success: true,
            count: assignments.length,
            data: assignments
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get assignment by ID
exports.getAssignmentById = async (req, res) => {
    try {
        
        const { id: assignmentId } = req.params;

        
        const assignment = await Assignment.findOne({ assignmentId }).populate('vehicleId', 'assetId modelNumber');

        if (!assignment) {
            return res.status(404).json({
                success: false,
                message: 'Assignment not found'
            });
        }

        res.status(200).json({
            success: true,
            data: assignment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving the assignment',
            error: error.message
        });
    }
};


// Update assignment status
exports.updateAssignmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id: assignmentId } = req.params;

        const userId = req.user.userId;
        const userRole = req.user.role; 

        // Find the assignment by assignmentId
        const assignment = await Assignment.findOne({ assignmentId });

        if (!assignment) {
            return res.status(404).json({
                success: false,
                message: 'Assignment not found'
            });
        }

        // Check if the user is the creator or an admin
        if (assignment.createdBy.toString() !== userId && userRole !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized action'
            });
        }

        // Update the assignment status
        assignment.status = status;
        await assignment.save();

        res.status(200).json({
            success: true,
            data: assignment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Delete assignment
exports.deleteAssignment = async (req, res) => {
    try {
        const { id: assignmentId } = req.params;

        const userId = req.user.userId;  
        const userRole = req.user.role;  

        // Find the assignment by assignmentId
        const assignment = await Assignment.findOne({ assignmentId });

        if (!assignment) {
            return res.status(404).json({
                success: false,
                message: 'Assignment not found'
            });
        }

        // Check if the user is the creator or an admin
        if (assignment.createdBy.toString() !== userId && userRole !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized action'
            });
        }

        
        const vehicle = await Vehicle.findById(assignment.vehicleId);
        if (vehicle) {
            vehicle.assignments = vehicle.assignments.filter(
                (id) => id.toString() !== assignment._id.toString()
            );

            
            if (vehicle.assignments.length === 0) {
                vehicle.status = 'available';
            }

            await vehicle.save();
        }

        
        await Assignment.deleteOne({ _id: assignment._id });

        res.status(200).json({
            success: true,
            message: 'Assignment deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

