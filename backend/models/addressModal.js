const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    addressTitle: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: false
    },
    pincode: {
        type: Number,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    defaults: {
        type: Boolean,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Address", addressSchema);