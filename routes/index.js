// - index.js: connect all routes into the main application router.

const router = require('express').Router({mergeParams:true});
// mergeParams option to ensure that your route handlers have access to all endpoint parameters throughout the routing/middleware chain

const scheduleRouter = require('./courseSemesterSchedule.js');

router.use('/schedule', scheduleRouter);

module.exports = router;