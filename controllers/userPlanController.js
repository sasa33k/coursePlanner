const { User } = require('../models/user');

// create semester schedule
const createUser = (req,res) => {
    //req.body.type = req.params.type;
    let user = new User(req.body); 
    console.log(user);

    User.updateOne({ email: req.body.email },
        {$setOnInsert: user},
        {upsert: true}
    )
    .then(result=>{
        res.status(201).json({ data: result });
        // user.save()
        // .then(result=>{
        //     //res.set('content-location', `${req.originalUrl}/${result._id}`);
        //     res.status(201).json({ data: result });
        //         //, url:`${req.originalUrl}/${result._id}`});
        // }) 
        // .catch(error=>{
        //     if(error.name == "ValidationError"){
        //         res.status(403).send(error)
        //     }else{
        //         console.log(error)
        //         res.status(500).send(error)};
        //     }
        // )
    }) 
    .catch(error=>{
            console.log(error);
            res.status(500).send(error);}
    )
};


// get user plans by email and semester
const getUserPlans = (req,res) => { 
    User.aggregate([
        { $match: {email:req.body.email}},
        { $project: {
            email: true,
            plans: {$filter: {
                input: '$plans',
                as: 'item',
                cond: {$eq: ['$$item.semester', req.body.semester]}
            }}
        }}
    ])
    .then(result=>{
        res.status(200).json({data:result});
    }) 
    .catch(error=>{res.status(500).send(error)});
};

// update user plans by email and plan id
const updateUserPlan = (req,res) => { 

    // "_id":"6529bb22ba89ee44801aec3c",
    if (req.body._id == undefined){ //insert
        User.updateOne(
            {"email":req.body.email
            },{
                $push:{
                    plans:{
                        "semester": req.body.plan.semester,
                        "description": req.body.plan.description,
                        "courses": req.body.plan.courses
                    }
                }
            })
        .then(result=>{
            res.status(201).json({ data: result });
        }) // update
        .catch(error=>{
                console.log(error);
                res.status(500).send(error);}
        )
        
    } else {
        User.updateOne(
            {"email":req.body.email,
             "plans._id": req.body._id,
            },{
                $set:{
                    "plans.$.semester": req.body.plan.semester,
                    "plans.$.description": req.body.plan.description,
                    "plans.$.courses": req.body.plan.courses
                }
            })
        .then(result=>{
            res.status(201).json({ data: result });
        }) 
        .catch(error=>{
                console.log(error);
                res.status(500).send(error);}
        )
    }
};


// delete user plans by email and plan id
const deleteUserPlan = (req,res) => { 
    
    User.deleteOne(
        {"email":req.body.email,
         "plans._id": req.body._id,
        },{
            $set:{
                "plans.$.courses": req.body.courses
            }
        })
    .then(result=>{
        res.status(201).json({ data: result });
    }) 
    .catch(error=>{
            console.log(error);
            res.status(500).send(error);}
    )
};

module.exports = {createUser, getUserPlans, updateUserPlan, deleteUserPlan};