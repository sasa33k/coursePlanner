const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const { CourseScheduleSchema } = require("./courseSchedule");





/**
 * @swagger
 * components:
 *   schemas:
 *     courseSemesterSchedule:
 *       type: object
 *       required:
 *         - semester
 *       properties:
 *         semester:
 *           type: string
 *           description: Semester code YYYYnn where nn 10=Spring; 20=Summer; 30=Winter
 *         courseCount:
 *           type: number
 *           description: Number of courses exists for that Semester
 *         registrationStartDate1:
 *           type: string
 *           description: Start Date for Registration Period 1
 *         registrationStartDateAS:
 *           type: string
 *           description: Start Date for Arts and Science
 *         registrationStartDate2:
 *           type: string
 *           description: Start Date for Registration Period 2
 *         regularStartDate:
 *           type: string
 *           description: Start Date for Regular Semester
 *         regularEndDate:
 *           type: string
 *           description: End Date for Regular Semester
 *         regularExamStartDate:
 *           type: string
 *           description: Start Date for Regular Semester Exams
 *         regularExamEndDate:
 *           type: string
 *           description: End Date for Regular Semester Exams
 *         courseSchedules:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CourseSchedule'
 *           description: Corresponding course schedules for the semester
 *       example:
 *         code: CPSC 0000
 *         sectionCount: 3
 *         sections: []
 */

let CourseSemesterScheduleSchema = new Schema(
{
    semester: {
        type: String,
        required: true,
        minlength:6,
        maxlength:6
    },
    courseCount:{
        type: Number
    },
    registrationStartDate1: {
        type: String
    },
    registrationStartDateAS: {
        type: String
    },
    registrationStartDate2: {
        type: String
    },
    regularStartDate: {
        type: String
    },
    regularEndDate: {
        type: String
    },
    regularExamStartDate: {
        type: String
    },
    regularExamEndDate: {
        type: String
    },
    courseSchedules:  [{ // The Ingreditent will be stored as a reference to the ID of an existing Ingredient document. 
        type: Schema.Types.ObjectId,
        ref: 'Course-Schedule'
    }]});
    
    // courseSchedules: [CourseScheduleSchema]


// a static function to search characters by type, and params for fields
CourseSemesterScheduleSchema.statics.search = function search (type, perPage, page) {
  return this.find({}) //"type":type})
    .select("code _id sectionCount")
    .limit(perPage)
    .skip(perPage*page)
    .exec();
}

const CourseSemesterSchedule = mongoose.model('Course-Semester-Schedule', CourseSemesterScheduleSchema);
module.exports = { CourseSemesterSchedule };