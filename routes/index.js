const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/exercises', require('./exercises'));
router.use('/workouts', require('./workouts'));
router.use('/users', require('./users'));     
router.use('/programs', require('./programs')); 

// Login Route
router.get('/login', passport.authenticate('github', { scope: [ 'user:email' ] }));

// GitHub Auth Callback
router.get('/github/callback', 
  passport.authenticate('github', { 
    failureRedirect: '/api-docs', 
    session: true 
  }),
  (req, res) => {
    req.session.user = req.user; 
    res.redirect('/');
  }
);

// Logout Route
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy(); // Clear the session entirely
    res.redirect('/');
  });
});

router.get('/', (req, res) => { 
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out"); 
});

module.exports = router;