const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    day: { type: Number, required: true },
    seat: { type: Number, required: true },
    client: { type: String, required: true },
    email: { type: String, required: true },
});

module.exports = mongoose.model('Seat', seatSchema);