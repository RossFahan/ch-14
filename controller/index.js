// routes 
//
//login page
//signup page
//dashboard page -- requires auth
//edit blog page -- requires auth
//homepage 
// blog details (include comments)
// create post -- requires auth

const apiRoutes = require('./api');

const router = require('express').Router();

// Use the imported route handlers
router.use('/api', apiRoutes);

module.exports = router;