const express = require('express');
const router = express.Router();
const workoutsController = require('../controllers/workouts');

router.get('/', workoutsController.getAll);
router.get('/:id', workoutsController.getSingle);

module.exports = router;