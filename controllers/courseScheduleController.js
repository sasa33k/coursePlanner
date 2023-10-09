const { CourseSchedule } = require('../models/courseSchedule');

// get CourseSchedule by ID and type
const getCourseScheduleById = (req,res) => { 
    
    CourseSchedule.findById(req.params.id)
    .exec()
    .then(result=>{
        res.status(200).json({data:result});
    }) 
    .catch(error=>{res.status(500).send(error)});
};

// get all courses (used in AddIngredients, create recipe page)
const getCourseSchedules = (req,res) => {
    
    CourseSchedule.aggregate([
        {
            $group: {
                _id: '$type',
                ingredients: { $push: '$$ROOT' }
            }
        }
    ])
    .then(results=>{res.status(200).json({data:results})})
    .catch(error=>{console.log(error);res.status(500).json(error)});
};
    
// create ingredient with posted information (used in create ingredient modal form)
const createCourseSchedule = (req,res) => {
    req.body.semester = req.params.semCode;
    console.log(req.body);
    let courseSchedule = new CourseSchedule(req.body); 
    courseSchedule.save()
    .then(result=>{
        res.set('content-location', `${req.originalUrl}/${result._id}`);
        res.status(201).json({ data: courseSchedule, url:`${req.originalUrl}/${result._id}`});
    }) 
    .catch(error=>{
        
        if(error.name == "ValidationError"){
            res.status(403).send(error)
        }else{
            res.status(500).send(error)};
        }
    );
    
};

 
// delete all courses by semester code
const deleteAllCourseBySemCode = (req,res) => {
    CourseSchedule.deleteMany({semester: req.params.semCode})
    .then(result=>{
        // res.set('content-location', `${req.originalUrl}/${result._id}`);
        res.status(201).json({result});
    }) 
    .catch(error=>{
        
        if(error.name == "ValidationError"){
            res.status(403).send(error)
        }else{
            res.status(500).send(error)};
        }
    );
    
};

module.exports = {getCourseScheduleById, getCourseSchedules, createCourseSchedule,deleteAllCourseBySemCode};