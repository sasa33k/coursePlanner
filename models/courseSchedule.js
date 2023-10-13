const mongoose = require('mongoose');
let Schema = mongoose.Schema;

// const { CourseScheduleSectionSchema } = require("./courseScheduleSection");
const { CourseScheduleSectionDetailsSchema } = require("./courseScheduleSectionDetails");




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
    RP: {
        type: String,
        maxlength:3
    },
    SeatsAvail: {
        type: String,
        required: true,
        minlength:1,
        maxlength:8
    },
    OnWaitlist: {
        type: String,
        maxlength:8
    },
    Sel: {
        type: String,
        maxlength:3
    },
    CRN: {
        type: String,
        required: true,
        minlength:5,
        maxlength:10
    },
    Subj: {
        type: String,
        required: true,
        minlength:3,
        maxlength:6
    },
    Crse: {
        type: String,
        required: true,
        minlength:3,
        maxlength:6
    },
    Sec: {
        type: String,
        required: true,
        minlength:1,
        maxlength:5
    },
    Cred: {
        type: String,
        required: true,
        minlength:1,
        maxlength:5
    },
    Title: {
        type: String,
        required: true,
        maxlength:30
    },
    AddFees: {
        type: String,
        maxlength:10
    },
    RptLimit: {
        type: String,
        maxlength:4
    },
    Details: [CourseScheduleSectionDetailsSchema]});


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