// - index.js: connect all routes into the main application router.

const router = require('express').Router({mergeParams:true});
// mergeParams option to ensure that your route handlers have access to all endpoint parameters throughout the routing/middleware chain

const scheduleRouter = require('./courseSemesterSchedule.js');
//const courseRouter = require('./userCourse.js');

router.use('/schedule', scheduleRouter);
//router.use('/course', courseRouter);

module.exports = router;
