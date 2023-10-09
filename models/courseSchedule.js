const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const { CourseScheduleSectionSchema } = require("./courseScheduleSection");





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

let CourseScheduleSchema = new Schema(
{
    semester: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        minlength:8,
        maxlength:10
    },
    note: {
        type: String
    },
    sectionCount:{
        type: Number,
        required: true,
        min: 1
    },
    sections: [CourseScheduleSectionSchema]});


// a static function to search characters by type, and params for fields
CourseScheduleSchema.statics.search = function search (type, perPage, page) {
  return this.find({}) //"type":type})
    .select("code _id sectionCount")
    .limit(perPage)
    .skip(perPage*page)
    .exec();
}

const CourseSchedule = mongoose.model('Course-Schedule', CourseScheduleSchema);
module.exports = { CourseSchedule, CourseScheduleSchema }

// module.exports = { CourseScheduleSchema }