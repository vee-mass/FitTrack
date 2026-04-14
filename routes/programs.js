const express = require('express');
const router = express.Router();
const programsController = require('../controllers/programs');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', programsController.getAll);
router.get('/:id', programsController.getSingle);

router.post('/', 
  isAuthenticated, 
  validation.programRules(), 
  validation.validate, 
  programsController.createProgram
);

router.put('/:id', 
  isAuthenticated, 
  validation.programRules(), 
  validation.validate, 
  programsController.updateProgram
);

router.delete('/:id', isAuthenticated, programsController.deleteProgram);

module.exports = router;