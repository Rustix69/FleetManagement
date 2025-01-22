const Fleet = require('../model/fleet');
const Vehicle = require('../model/vehicle');

exports.createFleet = async (req, res) => {
    try {
        const fleet = new Fleet({
            fleetId: req.body.fleetId,
            name: req.body.name,
            description: req.body.description,
            classification: {
                type: req.body.classification.type,
                model: req.body.classification.model,
                usageCategory: req.body.classification.usageCategory
            }
        });
        await fleet.save();
        res.status(201).json({ success: true, data: fleet });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getFleetDetails = async (req, res) => {
    try {
        const fleet = await Fleet.findOne({ fleetId: req.params.id })
            .populate({
                path: 'assets',
                select: 'assetId type model status'
            });

        if (!fleet) {
            return res.status(404).json({ success: false, message: 'Fleet not found' });
        }
        res.status(200).json({ success: true, data: fleet });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.addAssetToFleet = async (req, res) => {
    try {
        const { fleetId } = req.params;
        const { assetId, categoryType } = req.body;

        const asset = await Vehicle.findOne({ assetId });
        if (!asset) {
            return res.status(404).json({
                success: false,
                message: 'Asset not found'
            });
        }

        await Fleet.findOneAndUpdate(
            {
                fleetId,
                'inventory.categories.type': { $ne: categoryType }
            },
            {
                $push: {
                    'inventory.categories': {
                        type: categoryType,
                        count: 0
                    }
                }
            }
        );

        const fleet = await Fleet.findOneAndUpdate(
            { fleetId },
            {
                $addToSet: { assets: asset._id },
                $inc: { 'inventory.totalAssets': 1 },
                $inc: { 'inventory.categories.$[elem].count': 1 }
            },
            {
                arrayFilters: [{ 'elem.type': categoryType }],
                new: true
            }
        );

        if (!fleet) {
            return res.status(404).json({
                success: false,
                message: 'Fleet not found'
            });
        }

        res.status(200).json({ success: true, data: fleet });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.updateFleetStatus = async (req, res) => {
    try {
        const { fleetId } = req.params;
        const { status } = req.body;

        const fleet = await Fleet.findOneAndUpdate(
            { fleetId },
            {
                status,
                lastUpdated: Date.now()
            },
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
