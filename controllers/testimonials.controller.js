const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Testimonial.find());
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Testimonial.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const tstm = await Testimonial.findOne().skip(rand);
        if (!tstm) res.status(404).json({ message: 'Not found' });
        else res.json(tstm);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const tstm = await Testimonial.findById(req.params.id);
        if (!tstm) res.status(404).json({ message: 'Not found' });
        else res.json(tstm);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.addNew = async (req, res) => {
    try {
        const { author, text } = req.body;
        const newTestimonial = new Testimonial({ author: author, text: text });
        await newTestimonial.save();
        res.json({ message: 'OK' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.modifyById = async (req, res) => {
    const { author, text } = req.body;
    try {
        const tstm = await Testimonial.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { author: author, text: text } },
            { new: true }
        );
        if (!tstm) {
            return res.status(404).json({ message: 'Not found...' });
        }
        res.json(tstm);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.removeById = async (req, res) => {
    try {
        const tstm = await Testimonial.findById(req.params.id);
        if (!tstm) {
            return res.status(404).json({ message: 'Not found...' });
        }
        const deletedTstm = await Testimonial.findOneAndDelete({ _id: req.params.id });
        res.json(deletedTstm);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};