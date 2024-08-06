const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    profile: { type: String, required: true },
    joiningDate: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: {
        currentAddress: { type: String, required: true },
        permanentAddress: { type: String, required: true }
    },
    dob: { type: Date, required: true },
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('users', userSchema);

module.exports = User;
