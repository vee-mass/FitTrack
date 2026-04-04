const express = require('express');
const router = express.Router();

router.use('/workouts', require('./workouts'));
router.use('/exercises', require('./exercises'));
module.exports = router;