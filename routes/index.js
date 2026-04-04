const express = require('express');
const router = express.Router();

router.use('/workouts', require('./workouts'));
module.exports = router;