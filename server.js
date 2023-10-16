const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require('path');
const socket = require('socket.io');

// Import routes
const testimonialRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '/client/build')));

// Add access to io in req.io
const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});

const io = socket(server);
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Add routes to server
app.use('/api', testimonialRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

// Serve React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// Catching bad links
app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
});

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
});