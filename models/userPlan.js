const mongoose = require('mongoose');
let Schema = mongoose.Schema;





/**
 * @swagger
 * components:
 *   schemas:
 *     courseSchedule:
 *       type: object
 *       required:
 *         - code
 *       properties:
 *         code:
 *           type: string
 *           description: Course Code
 *         sectionCount:
 *           type: number
 *           description: Number of sections exists for that Course
 *         sections:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CourseScheduleSection'
 *           description: Corresponding sections for the course
 *       example:
 *         code: CPSC 0000
 *         sectionCount: 3
 *         sections: []
 */

let UserPlanSchema = new Schema(
{
    semester: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength:1,
        maxlength:30
    },
    courses: [{
        type: String,
        required: true
    }]});


// a static function to search characters by type, and params for fields
UserPlanSchema.statics.search = function search (type, perPage, page) {
  return this.find({}) //"type":type})
    .select("code _id sectionCount")
    .limit(perPage)
    .skip(perPage*page)
    .exec();
}

// const UserPlan = mongoose.model('User-Plan', UserPlanSchema);
module.exports = { UserPlanSchema }
