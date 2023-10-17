const router = require('express').Router({mergeParams:true});
// mergeParams option to ensure that your route handlers have access to all endpoint parameters throughout the routing/middleware chain

const {getSemesterScheduleByCode, createSemesterSchedule, scrapeSemesterSchedule} = require('../controllers/courseSemesterController');
//const {commentValidator} = require('../validators/validators.js');
const {getCourseScheduleById, getCourseSchedules, createCourseSchedule, deleteAllCourseBySemCode}  = require('../controllers/courseScheduleController');



/**
 * @openapi
 * /api/v1/comment/{id}:
 *   post:
 *    summary: Add a Comment to specified recipe.
 *    tags: [Comment] 
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The id of recipe
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Comment'
 *    responses:
 *      201:
 *        description: The comment was created
 *        content:
 *          application/json:
 *              example:
 *                data:
 *                  _id: 642ce5dec1f331f17781d173
 *                  name: Fry Egg
 *                  type: main
 *                  description: Great for beginner!
 *                  cookingTimeInMinute: 3
 *                  ingredient:
 *                    - ingredient: 641e71f6a9b7c2542c8af51c
 *                      quantity: 100
 *                      unit: gram
 *                      _id: 642ce5dec1f331f17781d174
 *                  step: ["Break an egg", "Fry it"]
 *                  comments:
 *                    - name: Alex
 *                      comment: Great!
 *                      rating: 5
 *                      _id: 642cea9004ef14aecb3d9841
 *                url: /api/v1/comment/641e3e638a148960f8a69aee/642cea9004ef14aecb3d9841
 *      403: 
 *        description: Forbidden, validation failure
 *      500:
 *        description: Server error
 */
router.post('/', createSemesterSchedule);

router.post('/course/:semCode', createCourseSchedule);

router.post('/course/delete/:semCode', deleteAllCourseBySemCode);

router.get('/scrape/:semCode', scrapeSemesterSchedule);



/**
 * @openapi
 * /api/v1/comment/{id}:
 *   get:
 *    summary: Get Comments of a recipe.
 *    tags: [Comment]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The id of recipe
 *    responses:
 *      200:
 *        description: Data Retrieved
 *        content:
 *          application/json:
 *              example:
 *                data:
 *                    - name: sss
 *                      comment: nice!
 *                      rating: 3
 *                      _id: 641fff30a2a3fc8ac91d3715
 *      500:
 *        description: Server error
 */
router.get('/:semester', getSemesterScheduleByCode);

module.exports = router;