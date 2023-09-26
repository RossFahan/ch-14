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
const homeRoutes = require('./home-routes');
const router = require('express').Router();

router.use('/', homeRoutes);
router.use('/api', apiRoutes);


module.exports = router;