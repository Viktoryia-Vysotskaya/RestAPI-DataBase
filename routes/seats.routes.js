const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/random').get((req, res) => {
    const randomIndex = Math.floor(Math.random() * db.seats.length);
    const randomSeat = db.seats[randomIndex];
    res.json(randomSeat);
});

router.route('/seats/:id').get((req, res) => {
    const id = req.params.id;
    const seat = db.seats.find((item) => item.id === id);
    if (seat) {
        res.json(seat);
    } else {
        if (id !== 'random')
            res.status(404).json({ error: 'Seat not found' });
    }
});

router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body;

    if (!day || !seat || !client || !email) {
        return res.status(400).json({ error: 'One or more mandatory fields omitted.' });
    }

    const id = uuidv4();
    const newSeat = { id, day, seat, client, email };
    db.seats.push(newSeat);
    res.status(201).json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {
    const { id } = req.params;
    const { day, seat, client, email } = req.body;

    if (!day || !seat || !client || !email) {
        return res.status(400).json({ error: 'One or more mandatory fields omitted.' });
    }

    const modSeat = db.seats.find((item) => item.id === id);

    if (!modSeat) {
        return res.status(404).json({ message: 'Seat not found' });
    }

    modSeat.day = day;
    modSeat.seat = seat;
    modSeat.client = client;
    modSeat.email = email;

    res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
    const seatId = req.params.id;
    const seatIndex = db.seats.findIndex((seat) => seat.id === seatId);
    if (seatIndex !== -1) {
        db.seats.splice(seatIndex, 1);
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ message: 'Seat not found' });
    }
});

module.exports = router;