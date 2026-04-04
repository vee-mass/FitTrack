const express = require('express');
const router = express.Router();
const exercisesController = require('../controllers/exercises');

router.get('/', exercisesController.getAll);
router.post('/', exercisesController.createExercise);
router.put('/:id', exercisesController.updateExercise);
router.delete('/:id', exercisesController.deleteExercise);

module.exports = router;