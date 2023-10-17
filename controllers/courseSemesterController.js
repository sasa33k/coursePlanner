let { CourseSemesterSchedule } = require('../models/courseSemesterSchedule.js');

const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

const axios = require("axios")


// get semester schedules by Semester code with courses populated
const getSemesterScheduleByCode = (req,res) => { 
    CourseSemesterSchedule.findOne({"semester":req.params.semester})
    .populate({
        path: 'courseSchedules',
      })
    .exec()
    .then(result=>{
        res.status(200).json({data:result});
    }) 
    .catch(error=>{console.log(error);res.status(500).send(error)});
};

// path: 'courseSchedules',
// populate: {
//     path: 'sections',
//     select: '-__v',
//     populate: {
//         path: 'details',
//         select: '-__v'
//     },
// },

/*
// get recipe by type, allow request params: perPage, page, include_description
const getRecipes = (req,res) => {
    //?perPage=0&page=0&include_description=false
    let perPage = 0;
    let page = 0;
    if (req.query.page != undefined) page = parseInt(req.query.page);
    if (req.query.perPage != undefined) perPage = parseInt(req.query.perPage);

    //  Use of model static method
    Recipe.search(req.body.type, perPage, page-1)
    .then(results=>{
        console.log(results);
        
        // adding total count to result json
        Recipe.count({})
        .then(total=>{
            res.status(200).json({data:results, total:total});
        }) 
        .catch(error=>{res.status(500).send(error)});
    }) 
    .catch(error=>{res.status(500).send(error)});
};
*/


// create semester schedule
const createSemesterSchedule = (req,res) => {
    //req.body.type = req.params.type;
    let courseSemesterSchedule = new CourseSemesterSchedule(req.body); 
    console.log(courseSemesterSchedule);
    const query = { semester: req.body.semester };

    CourseSemesterSchedule.findOneAndDelete({ semester: req.body.semester })
    .then(result=>{
        courseSemesterSchedule.save()
        .then(result=>{
            //res.set('content-location', `${req.originalUrl}/${result._id}`);
            res.status(201).json({ data: result });
                //, url:`${req.originalUrl}/${result._id}`});
        }) 
        .catch(error=>{
            if(error.name == "ValidationError"){
                res.status(403).send(error)
            }else{
                console.log(error)
                res.status(500).send(error)};
            }
        )
    }) 
    .catch(error=>{
            console.log(error);
            res.status(500).send(error);}
    )
};


// Webscrape semester schedule
const scrapeSemesterSchedule = async (req,res) => {
    console.log("WebScrape Test")
    console.log(req.params);
    // Web Scraping Code here
    try {
      const result = await WebScrapingLocalTest(req.params.semCode);
      res.status(200).json(result);
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "ERROR",
      });
    }
};

async function WebScrapingLocalTest(semCode) {

    let driver = await new Builder().forBrowser('chrome').build();
    console.log("set driver")
    try {
        // Navigate to URL
        await driver.get(`https://swing.langara.bc.ca/prod/hzgkfcls.P_Sel_Crse_Search?term=${semCode}`);


        await driver.sleep(2000);
        // await driver.executeScript(`document.querySelectorAll('#subj_id option')[6].selected=true; document.querySelectorAll('#subj_id option')[4].selected=true; document.querySelector('input[value="Get Courses"]').click();`);
        // await driver.executeScript(`document.querySelectorAll('#subj_id option')[8].selected=true; document.querySelectorAll('#subj_id option')[4].selected=true; document.querySelector('input[value="Get Courses"]').click();`);
        await driver.executeScript(`for (o of document.querySelectorAll('#subj_id option')){o.selected=true}; document.querySelector('input[value="Get Courses"]').click();`);

        await driver.sleep(3000);
        console.log("finish wait");

      // Get element with tag name 'div'
      let courseTable = await driver.findElements(By.className('dataentrytable'));

      
      let courseRows = await courseTable[0].findElements(By.css('tr'));

      let tableTitle = ['RP', 'SeatsAvail', 'OnWaitlist', 'Sel', 'CRN', 'Subj', 'Crse', 'Sec', 'Cred',
        'Title', "AddFees", 'RptLimit', 'Type', 'Days', 'Time', 'NonStandardStart', 'NonStandardEnd', 'Room', 'Instructor']
      
      let tableArr = [];
      let currentCourse = "dummy";
      let sectionCount = -1; // 0 when see course code
      let detailCount = 0;
      let currentSection = {};
      for(let row of courseRows) {
          let cols = await row.findElements(By.css("td"));
          let headerClass = await cols[0].getAttribute("class");
          let rowBg = await row.getAttribute("bgcolor");
          if(headerClass=="deheader" || rowBg!=undefined ){continue;}



          let rowArr = [];
          for(let col of cols) {
            let colText = await col.getText();
            rowArr.push(colText);
            //console.log(colText);
          }
          console.log(rowArr.length>4?rowArr[4]:rowArr[0]);

          if (rowArr.length == 1 && rowArr[0] && rowArr[0] != ' ') { // indicates a course Header
            if(sectionCount>-1){
                console.log("push");
                currentCourse.sections.push(currentSection);
                currentCourse.sectionCount = sectionCount;
                tableArr.push(currentCourse) // push when reach next course
                sectionCount=-1; // reset sectionCount
                detailCount=0; // reset detailCount
            }
            currentCourse={"code":rowArr[0].substring(0,10).trim(), "note":rowArr[0].substring(10), "sections":[]}; // reset current course
            sectionCount++
            console.log("currentCourse: " + currentCourse.code);
          } else if (rowArr.length >13 && rowArr[1]  && rowArr[1] != ' ') { // indicates a new section
            console.log("newSection");
            if(detailCount>0){ // indicates a new section for the same course
                currentCourse.sections.push(currentSection);
                detailCount=0; // reset detailCount
            }
            currentSection = {};
            let sectionDetail = {};
            for (let i in rowArr){
                if(i<12){
                    currentSection[tableTitle[i]] = rowArr[i];
                } else {
                    sectionDetail[tableTitle[i]] = rowArr[i];
                }
            }
            currentSection.Details=[];
            currentSection.Details.push(sectionDetail);

            sectionCount++
            detailCount++
          } else if (rowArr.length >13 && rowArr[12]  && rowArr[12] != ' '){ // indicates a section detail
            let sectionDetail = {};
            for (let i in rowArr){
                if(i>=12){
                    sectionDetail[tableTitle[i]] = rowArr[i];
                }
            }
            currentSection.Details.push(sectionDetail);
            detailCount++
          }
      }

      currentCourse.sectionCount = sectionCount;
      currentCourse.sections.push(currentSection);
      tableArr.push(currentCourse) // push when reach end of all rows
      sectionCount=0; // reset sectionCount

      console.log("==== Final Output ====");
      console.log(tableArr);
      console.log("..");

    //   console.log("==== Final Output2 ====");
    //   for (let obj of tableArr){
    //     console.log(`>> ${obj.code} | ${obj.sectionCount} || `) ;
    //     for(let op of obj.sections){
    //         console.log(op);
    //     }
    //   }
      return tableArr;
    } catch (error) {
        throw new Error(error);
    } finally {
        await driver.quit();
    }
}



module.exports = {getSemesterScheduleByCode, createSemesterSchedule, scrapeSemesterSchedule};