const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/random', ConcertController.getRandom);
router.get('/concerts/:id', ConcertController.getById);
router.post('/concerts', ConcertController.addNew);
router.put('/concerts/:id', ConcertController.modifyById);
router.delete('/concerts/:id', ConcertController.removeById);

router.get('/concerts/performer/:performer', ConcertController.getAllByPerformer);
router.get('/concerts/genre/:genre', ConcertController.getAllByGenre);
router.get('/concerts/price/:price_min/:price_max', ConcertController.getAllByPrice);
router.get('/concerts/day/:day', ConcertController.getAllByDay);

module.exports = router;