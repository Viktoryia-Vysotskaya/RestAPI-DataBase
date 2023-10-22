const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/random', ConcertController.getRandom);
router.get('/concerts/:id', ConcertController.getById);
router.post('/concerts', ConcertController.addNew);
router.put('/concerts/:id', ConcertController.modifyById);
router.delete('/concerts/:id', ConcertController.removeById);

module.exports = router;