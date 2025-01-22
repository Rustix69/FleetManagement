const Vehicle = require('../model/vehicle');
const Assignment = require('../model/assignment');

// Create a new vehicle
exports.createVehicle = async (req, res) => {
    try {
        const vehicle = new Vehicle({
            assetId: req.body.assetId,
            category: req.body.category,
            type: req.body.type,
            modelNumber: req.body.modelNumber,
            manufacturer: req.body.manufacturer,
            year: req.body.year,
            status: 'available'
        });
        await vehicle.save();
        res.status(201).json({ success: true, data: vehicle });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get all vehicles
exports.getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find()
            .populate({
                path: 'assignments',
                match: { endDate: { $gte: new Date() } }
            });

        const vehiclesWithStatus = vehicles.map(vehicle => ({
            ...vehicle.toObject(),
            currentStatus: vehicle.assignments.length > 0 ? 'assigned' : vehicle.status
        }));

        res.status(200).json({
            success: true,
            count: vehicles.length,
            data: vehiclesWithStatus
        });
    } catch (error) {
        res.status(500).json({
            success: false, 
            error: error.message 
        });
    }
};

// Get a specific vehicle with its assignments
exports.getVehicleWithAssignments = async (req, res) => {
    try {
        const vehicle = await Vehicle.findOne({ assetId: req.params.id })
            .populate({
                path: 'assignments',
                match: { endDate: { $gte: new Date() } },
                options: { sort: { startDate: 1 } }
            });

        if (!vehicle) {
            return res.status(404).json({ success: false, message: 'Vehicle not found' });
        }

        res.status(200).json({ success: true, data: vehicle });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update the status of a vehicle
exports.updateVehicleStatus = async (req, res) => {
    try {
        const { status } = req.body;

        // Validate the status field
        if (!['available', 'assigned', 'maintenance'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const vehicle = await Vehicle.findOneAndUpdate(
            { assetId: req.params.id },
            { status },
            { new: true }
        );

        if (!vehicle) {
            return res.status(404).json({ success: false, message: 'Vehicle not found' });
        }

        res.status(200).json({ success: true, data: vehicle });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Check vehicle availability
exports.getVehicleAvailability = async (req, res) => {
    try {
        const vehicle = await Vehicle.findOne({ assetId: req.params.id });

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {
                vehicleId: vehicle.assetId,
                status: vehicle.status,
                isAvailable: vehicle.status === 'available'
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};