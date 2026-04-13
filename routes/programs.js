const express = require('express');
const router = express.Router();
const programsController = require('../controllers/programs');
const { programRules, validate } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', programsController.getAll);
router.get('/:id', programsController.getSingle);

router.post('/',isAuthenticated, programRules(), validate, programsController.createProgram);
router.put('/:id',isAuthenticated,programRules(), validate, programsController.updateProgram);
router.delete('/:id', isAuthenticated, programsController.deleteProgram);

module.exports = router;