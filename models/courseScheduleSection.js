const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const { CourseScheduleSectionDetailsSchema } = require("./courseScheduleSectionDetails");



/**
 * @swagger
 * components:
 *   schemas:
 *     CourseScheduleSection:
 *       type: object
 *       required:
 *         - CRN
 *       properties:
 *         RP:
 *           type: string
 *           description: R-Restricted to students in specific programs ; P-Course have prerequisite
 *         SeatsAvail:
 *           type: string
 *           description: Seats Available for the section
 *         OnWaitlist:
 *           type: string
 *           description: Number of students on waitlist
 *         Sel:
 *           type: string
 *           description: button action on original site
 *         CRN:
 *           type: string
 *           description: Course Reference Number
 *         Subj:
 *           type: string
 *           description: Course Subject Area
 *         Crse:
 *           type: string
 *           description: Course Code
 *         Sec:
 *           type: string
 *           description: Section Code
 *         Cred:
 *           type: string
 *           description: Course Credits
 *         Title:
 *           type: string
 *           description: Course Title
 *         AddFees:
 *           type: string
 *           description: Additional Fees- Indicates if the course has any additional fees beyond general tuition and student fees.
 *         RptLimit:
 *           type: string
 *           description: Repeat Limit- The number of times a course can be repeated.
 *         detail:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CourseScheduleSectionDetail'
 *           description: Corresponding section detail for the section
 */



// *       example:
// *         "RP": " ",
// *  	   "SeatsAvail": "1",
// *  	   "OnWaitlist": "11",
// *  	   "Sel": " ",
// *  	   "CRN": "20106",
// *  	   "Subj": "BCAP",
// *  	   "Crse": "1200",
// *  	   "Sec": "001",
// *  	   "Cred": "3.00",
// *  	   "Title": "Business Computer Applns I",
// *  	   "AddFees": "$34.00",
// *  	   "RptLimit": "2",
// *  	   "Details": []


let CourseScheduleSectionSchema = new Schema(
{
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
CourseScheduleSectionSchema.statics.search = function search (type, perPage, page) {
  return this.find({}) //"type":type})
    .select("code _id sectionCount")
    .limit(perPage)
    .skip(perPage*page)
    .exec();
}

// const CourseScheduleSection = mongoose.model('Course-Schedule-Section', CourseScheduleSectionSchema);
// module.exports = { CourseScheduleSection, CourseScheduleSectionSchema }

module.exports = { CourseScheduleSectionSchema }