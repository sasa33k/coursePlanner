const mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     CourseScheduleSectionDetail:
 *       type: object
 *       required:
 *         - code
 *       properties:
 *         Type:
 *           type: string
 *           description: Instruction Format
 *         Days:
 *           type: string
 *           description: Meeting Days M=Monday, T=Tuesday, W=Wednesday, R=Thursday, F=Friday, S=Saturday
 *         Time:
 *           type: string
 *           description: The start and end time for the course. Langara uses a 24-hour clock. For example 1830 = 6:30pm.
 *         NonStandardStart:
 *           type: string
 *           description: Indicates a course's Start dates if not a full semester.
 *         NonStandardEnd:
 *           type: string
 *           description: Indicates a course's End dates if not a full semester.
 *         Room:
 *           type: string
 *           description: The room that the lecture or lab is held in. If the course has both a lecture and lab, they may be held in different rooms.
 *         Instructor:
 *           type: string
 *           description: Last name and first initial of all instructors for the course.
 */




// *        example:
// *			"Type": "Lecture"
// *			"Days": "M-W----"
// *			"Time": "1030-1220"
// *			"NonStandardStart": " "
// *			"NonStandardEnd": " "
// *			"Room": "L103"
// *			"Instructor": "Anu Kumar"

let CourseScheduleSectionDetailsSchema = new Schema(
{
    Type: {
        type: String,
        required: true,
        minlength:1,
        maxlength:30
    },
    Days: {
        type: String,
        required: true,
        minlength:7,
        maxlength:7
    },
    Time: {
        type: String,
        required: true,
        minlength:1,
        maxlength:10
    },
    NonStandardStart: {
        type: String,
        maxlength:20
    },
    NonStandardEnd: {
        type: String,
        maxlength:20
    },
    Room: {
        type: String,
        maxlength:10
    },
    Instructor: {
        type: String
    }
});


// a static function to search characters by type, and params for fields
CourseScheduleSectionDetailsSchema.statics.search = function search (type, perPage, page) {
  return this.find({}) //"type":type})
    .select("code _id sectionCount")
    .limit(perPage)
    .skip(perPage*page)
    .exec();
}

// const CourseScheduleSectionDetails = mongoose.model('Course-Schedule-Section-Detail', CourseScheduleSectionDetailsSchema);
// module.exports = { CourseScheduleSectionDetails, CourseScheduleSectionDetailsSchema }

module.exports = { CourseScheduleSectionDetailsSchema }