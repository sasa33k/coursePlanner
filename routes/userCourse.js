const router = require('express').Router({mergeParams:true});
// mergeParams option to ensure that your route handlers have access to all endpoint parameters throughout the routing/middleware chain

const {getSemesterScheduleByCode, createSemesterSchedule, scrapeSemesterSchedule, scrapeScheduleCheerio} = require('../controllers/courseSemesterController');
//const {commentValidator} = require('../validators/validators.js');
const {getCourseScheduleById, getCourseScheduleBySemCrn, createCourseSchedule, deleteAllCourseBySemCode}  = require('../controllers/courseScheduleController');

const {createUser, getUserPlans, updateUserPlan} = require('../controllers/userPlanController');

router.post('/user', createUser);
// router.get('/userPlan', getUserPlans);
router.post('/userPlan', getUserPlans);
router.post('/userPlanUpdate', updateUserPlan);



module.exports = router;