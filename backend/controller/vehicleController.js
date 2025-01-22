const Vehicle = require('../model/vehicle');
const Assignment = require('../model/assignment');

exports.createVehicle = async (req, res) => {
    try {
        const vehicle = new Vehicle({
            assetId: req.body.assetId,
            type: req.body.type,
            model: req.body.model,
            manufacturer: req.body.manufacturer,
            specifications: req.body.specifications,
            status: 'available'
        });
        await vehicle.save();
        res.status(201).json({ success: true, data: vehicle });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

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


exports.getVehicleWithAssignments = async (req, res) => {
    try {
        const vehicle = await Vehicle.findOne({ assetId: req.params.id })
            .populate({
                path: 'assignments',
                match: {
                    endDate: { $gte: new Date() }
                },
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

exports.updateVehicleStatus = async (req, res) => {
    try {
        const vehicle = await Vehicle.findOneAndUpdate(
            { assetId: req.params.id },
            { status: req.body.status },
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

exports.getVehicleAvailability = async (req, res) => {
    try {
        const vehicleId = req.params.id;

        const vehicle = await Vehicle.findOne({
            assetId: {
                $regex: new RegExp(`^${vehicleId}$`, 'i')
            }
        });

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found'
            });
        }

        // Check if the vehicle is available
        const isAvailable = vehicle.status === 'available';

        res.status(200).json({
            success: true,
            data: {
                vehicleId: vehicle.assetId,
                status: vehicle.status,
                isAvailable
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


