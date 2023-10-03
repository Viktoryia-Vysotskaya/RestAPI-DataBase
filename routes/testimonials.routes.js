const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

// It's just supposed to return the entire contents of the array.
router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

// Return a random element from the array.
router.route('/testimonials/random').get((req, res) => {
    const randomIndex = Math.floor(Math.random() * db.testimonials.length);
    const randomTestimonial = db.testimonials[randomIndex];
    res.json(randomTestimonial);
});

// Return only one element of the array, matching :id.
router.route('/testimonials/:id').get((req, res) => {
    const id = req.params.id;
    const testimonial = db.testimonials.find((item) => item.id === id.toString());
    if (testimonial) {
        res.json(testimonial);
    } else {
        res.status(404).json({ error: 'Testimonial not found' });
    }
});

// Add new random element.
router.route('/testimonials').post((req, res) => {
    console.log('POST request received:', req.body);
    const { author, text } = req.body;
    if (!author || !text) {
        return res.status(400).json({ error: 'Author and text are required fields' });
    }
    const id = uuidv4();
    const newTestimonial = { id, author, text };
    db.testimonials.push(newTestimonial);
    res.json({ message: 'Testimonial added successfully', id });
});

// Modify the author and text attributes of the array element with the matching :id.
router.route('/testimonials/:id').put((req, res) => {
    const { id } = req.params;
    const { author, text } = req.body;
    if (!author || !text) {
        return res.status(400).json({ error: 'Author and text are required fields' });
    }
    const testimonial = db.testimonials.find((item) => item.id === id);
    if (!testimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
    }
    testimonial.author = author;
    testimonial.text = text;
    res.json({ message: 'OK' });
});

// Remove the entry with the given id from the db.
router.route('/testimonials/:id').delete((req, res) => {
    const testimonialId = req.params.id;
    const testimonialIndex = db.testimonials.findIndex((testimonial) => testimonial.id === testimonialId);
    if (testimonialIndex !== -1) {
        db.testimonials.splice(testimonialIndex, 1);
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ message: 'Testimonial not found' });
    }
});

module.exports = router;