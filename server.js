const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');

// Import routes
const testimonialRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());

app.use(express.static(path.join(__dirname, '/client/build')));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if (NODE_ENV === 'production') dbUri = process.env.DB_URI_PROD;
else if (NODE_ENV === 'test') dbUri = process.env.DB_URI_TEST;
else dbUri = process.env.DB_URI_DEV;

// Conncection the code with DB
try {
    mongoose.connect(process.env.DB_URI_DEV, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.once('open', () => {
        if (NODE_ENV !== "test") console.log("Connected to the database");
    });
    db.on('error', err => console.log('Error ' + err));
} catch (err) {
    console.log('Couldn\'t connect to db...');
}

let server;

try {
    server = app.listen(process.env.PORT || 8000, () => {
        console.log('Server is running on port: 8000');
    });
} catch (err) {
    console.log('Couldn\'t start the server...');
}

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

module.exports = server;