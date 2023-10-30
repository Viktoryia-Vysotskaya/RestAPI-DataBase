const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Concert.find());
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Concert.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const crt = await Concert.findOne().skip(rand);
        if (!crt) res.status(404).json({ message: 'Not found' });
        else res.json(crt);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const crt = await Concert.findById(req.params.id);
        if (!crt) res.status(404).json({ message: 'Not found' });
        else res.json(crt);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.addNew = async (req, res) => {
    try {
        const { performer, genre, price, day, image } = req.body;
        const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
        await newConcert.save();
        res.json({ message: 'OK' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.modifyById = async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    try {
        const crt = await Concert.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { performer: performer, genre: genre, price: price, day: day, image: image } },
            { new: true }
        );
        if (!crt) {
            return res.status(404).json({ message: 'Not found...' });
        }
        res.json(crt);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.removeById = async (req, res) => {
    try {
        const crt = await Concert.findById(req.params.id);
        if (!crt) {
            return res.status(404).json({ message: 'Not found...' });
        }
        const deletedCrt = await Concert.findOneAndDelete({ _id: req.params.id });
        res.json(deletedCrt);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getAllByPerformer = async (req, res) => {
    try {
        const crt = await Concert.find({ performer: req.params.performer });
        if (!crt) res.status(404).json({ message: 'Not found...' });
        else res.json(crt);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getAllByGenre = async (req, res) => {
    try {
        const crt = await Concert.find({ genre: req.params.genre });
        if (!crt) res.status(404).json({ message: 'Not found...' });
        else res.json(crt);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getAllByPrice = async (req, res) => {
    try {
        const crt = await Concert.find({ price: { $gte: req.params.price_min, $lte: req.params.price_max }, });
        if (!crt) res.status(404).json({ message: 'Not found...' });
        else res.json(crt);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getAllByDay = async (req, res) => {
    try {
        const crt = await Concert.find({ day: req.params.day });
        if (!crt) res.status(404).json({ message: 'Not found...' });
        else res.json(crt);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};