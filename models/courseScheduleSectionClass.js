const mongoose = require('mongoose');
let Schema = mongoose.Schema;


let CourseScheduleSectionClassSchema = new Schema(
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
});


// a static function to search characters by type, and params for fields
CourseScheduleSectionClassSchema.statics.search = function search (type, perPage, page) {
  return this.find({}) //"type":type})
    //.select("code _id sectionCount")
    .limit(perPage)
    .skip(perPage*page)
    .exec();
}

const CourseScheduleSectionClass = mongoose.model('CourseScheduleSectionClass', CourseScheduleSectionClassSchema);
module.exports = CourseScheduleSectionClass;