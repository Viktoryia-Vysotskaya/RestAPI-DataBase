const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Import routes
const testimonialRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

// Add testimonial routes to server
app.use('/api', testimonialRoutes);
// Add concerts routes to server
app.use('/api', concertsRoutes);
// Add seats routes to server
app.use('/api', seatsRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });
  
app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
});

app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});