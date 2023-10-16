const mongoose = require('mongoose');
let Schema = mongoose.Schema;



const { UserPlanSchema } = require("./userPlan");


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

let UserSchema = new Schema(
{
    email: {
        type: String,
        required: true
    },
    plans: [UserPlanSchema]});


// a static function to search characters by type, and params for fields
UserSchema.statics.search = function search (type, perPage, page) {
  return this.find({}) //"type":type})
    .select("code _id sectionCount")
    .limit(perPage)
    .skip(perPage*page)
    .exec();
}

const User = mongoose.model('User', UserSchema);
module.exports = { User, UserSchema }
