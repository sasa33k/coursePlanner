import React from 'react';
const { useState } = React;

// import TypeChooser from './TypeChooser';
// import Activity from './Activity';
import CourseRetrieval from './CourseRetrieval';
import TimetableSemesterOverview from './TimetableSemesterOverview'
import TimetableCourseList from './TimetableCourseList'
import TimetableSemesterSelection from './TimetableSemesterSelection';
import TimetableScheduler from './TimetableScheduler';
import UserPlan from './UserPlan';

const App = props=>{ 

  const [courseSchedules, setCourseSchedules] = useState({"_id":"65130f62a723b6748ab84ff1","semester":"202330","courseCount":629,"registrationStartDate1":"2023-06-19T00:00:00.000Z","registrationStartDateAS":"2023-06-26T00:00:00.000Z","registrationStartDate2":"2023-08-24T00:00:00.000Z","regularStartDate":"2023-09-05T00:00:00.000Z","regularEndDate":"2023-12-04T00:00:00.000Z","regularExamStartDate":"2023-12-05T00:00:00.000Z","regularExamEndDate":"2023-12-16T00:00:00.000Z","courseSchedules":[{
    "_id":"65130f5aa723b6748ab83dff","semester":"202330","code":"ABST 1100","note":"","sectionCount":1,
    "RP":" ","SeatsAvail":"Cancel","OnWaitlist":"N/A","Sel":" ","CRN":"30918","Subj":"ABST","Crse":"1100","Sec":"001","Cred":"3.00","Title":"Canadian Aboriginal Experience","AddFees":" ","RptLimit":"-","Details":[{"Type":"Lecture","Days":"-T-----","Time":"1030-1320","NonStandardStart":" ","NonStandardEnd":" ","Room":" ","Instructor":" ","_id":"65130f5aa723b6748ab83e01"}],"_id":"65130f5aa723b6748ab83e00"}],"__v":0});
  const [semester, setSemester] = useState('');
  const [selectedCourse, setSelectedCourse] = useState([{
    "semester":"202130",
    "code":"DASH 2199",
    "note":"***NEW COURSE***",
    "sectionCount":1,
    "RP": " ",
    "SeatsAvail": "Cancel",
    "OnWaitlist": "N/A",
    "Sel": " ",
    "CRN": "30918",
    "Subj": "ABST",
    "Crse": "1100",
    "Sec": "001",
    "Cred": "3.00",
    "Title": "Canadian Aboriginal Experience",
    "AddFees": " ",
    "RptLimit": "-",
    "Details": [
        {
            "Type": "Lecture",
            "Days": "-T-----",
            "Time": "1030-1320",
            "NonStandardStart": " ",
            "NonStandardEnd": " ",
            "Room": " ",
            "Instructor": " ",
            "_id": "65130f5aa723b6748ab83e01"
        }
    ],
    "_id": "65130f5aa723b6748ab83e00"
  }]);
  const [selectedPlanCRN, setSelectedPlanCRN] = useState([]);
  const [selectedCRN, setSelectedCRN] = useState([]);
	const [loading, setLoading] = useState(false);


	return (
    <div className="planner-timetable">
      <div className="planner-timetable-header timetable-grid">
	      <h1>Semester Timetable Planner</h1>
        <UserPlan semester={semester.toString()} selectedCRN={selectedCRN} selectedPlanCRN={selectedPlanCRN} setSelectedPlanCRN={setSelectedPlanCRN}/>
      </div>

      <div className="planner-timetable-selection timetable-grid">
        <TimetableSemesterSelection semester={semester} setSemester={setSemester} setLoading={setLoading} courseSchedules={courseSchedules} setCourseSchedules={setCourseSchedules}/>
        <TimetableSemesterOverview courseSchedules={ courseSchedules } />
      </div>

      <div className="planner-timetable-calendar timetable-grid">
        <TimetableScheduler selectedCourse={selectedCourse} regularStartDate={courseSchedules==undefined?new Date():courseSchedules.regularStartDate} regularEndDate={courseSchedules==undefined?new Date():courseSchedules.regularEndDate}/>
        {courseSchedules==undefined?'':<TimetableCourseList loading={loading} courseSchedules={ courseSchedules } selectedPlanCRN={selectedPlanCRN} setSelectedCourse={setSelectedCourse} selectedCourse={selectedCourse} selectedCRN={selectedCRN} setSelectedCRN={setSelectedCRN}/> }
      </div>

      <CourseRetrieval aa="b"/>
      {console.log(new Date())}
    </div>
        ); 
};
export default App;
