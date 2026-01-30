const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const Shipping = require('../models/addressModal');
const ErrorHandler = require('../utils/errorHandler');


// Get Address Details
exports.getAddressDetails = asyncErrorHandler(async (req, res, next) => {

    const shipping = await Shipping.find({ user: req.params.id })
        .sort({ defaults: -1, createdAt: -1 });

    if (!shipping) {
        return next(new ErrorHandler("Shipping Address Not Found", 404));
    }

    res.status(200).json({
        success: true,
        shipping,
    });
});

// Get Address Details By Id
exports.getAddressDetailsById = asyncErrorHandler(async (req, res, next) => {

    const shipping = await Shipping.findById(req.params.id);

    if (!shipping) {
        return next(new ErrorHandler("Shipping Address Not Found", 404));
    }

    res.status(200).json({
        success: true,
        shipping,
    });
});

// Create Shipping Address
exports.createShippingAddress = asyncErrorHandler(async (req, res, next) => {

    req.body.user = req.user.id;

    if (req.body.defaults === true) {
        await Shipping.updateMany(
            { user: req.user.id, defaults: true },
            { $set: { defaults: false } }
        );
    }

    const shipping = await Shipping.create(req.body);

    res.status(201).json({
        success: true,
        shipping
    });
});

// Update Shipping Address
exports.updateShipping = asyncErrorHandler(async (req, res, next) => {

    let shipping = await Shipping.findById(req.params.id);

    if (!shipping) {
        return next(new ErrorHandler("Shipping Address Not Found", 404));
    }

    // Ensure address belongs to logged-in user
    if (shipping.user.toString() !== req.user.id) {
        return next(new ErrorHandler("Unauthorized", 403));
    }

    // If updating to default → unset other defaults
    if (req.body.defaults === true) {
        await Shipping.updateMany(
            {
                user: req.user.id,
                defaults: true,
                _id: { $ne: shipping._id }
            },
            { $set: { defaults: false } }
        );
    }

    shipping = await Shipping.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        success: true,
        shipping
    });
});

// Delete Shipping Address
exports.deleteShippingAddress = asyncErrorHandler(async (req, res, next) => {

    const shipping = await Shipping.findById(req.params.id);

    if (!shipping) {
        return next(new ErrorHandler("Shipping Address Not Found", 404));
    }

    // Ensure user owns the address
    if (shipping.user.toString() !== req.user.id) {
        return next(new ErrorHandler("Unauthorized", 403));
    }

    const userId = shipping.user;
    const wasDefault = shipping.defaults;

    // Delete address
    await shipping.deleteOne();

    // If deleted address was default → set another as default
    if (wasDefault) {
        const nextDefault = await Shipping.findOne({ user: userId })
            .sort({ createdAt: -1 });

        if (nextDefault) {
            nextDefault.defaults = true;
            await nextDefault.save();
        }
    }

    res.status(200).json({
        success: true,
        message: "Address deleted successfully"
    });
});