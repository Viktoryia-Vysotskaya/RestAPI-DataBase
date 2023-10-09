const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require('path');
const socket = require('socket.io');

const app = express();

// Import routes
const testimonialRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/concerts', concertsRoutes);
app.use('/api/seats', seatsRoutes);

app.use(express.static(path.join(__dirname, '/client/build')));

// Serve React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    socket.on('disconnect', () => {
        console.log('Client disconnected: ' + socket.id);
    });
    socket.emit('message', 'Welcome to the server!');
});

// Catching bad links
app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});