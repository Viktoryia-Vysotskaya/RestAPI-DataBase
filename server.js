const express = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

// It's just supposed to return the entire contents of the array.
app.get('/testimonials', (req, res) => {
    res.json(db);
});

// Return only one element of the array, matching :id.
app.get('/testimonials/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const testimonial = db.find((item) => item.id === id);
    if (testimonial) {
        res.json(testimonial);
    } else {
        res.status(404).json({ error: 'Testimonial not found' });
    }
});

// Return a random element from the array.
app.get('/testimonials/random', (req, res) => {
    const randomIndex = Math.floor(Math.random() * db.length);
    const randomTestimonial = db[randomIndex];
    res.json(randomTestimonial);
});

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});