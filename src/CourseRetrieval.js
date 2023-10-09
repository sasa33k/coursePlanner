import React from 'react'
const { useEffect, useState } = React;
import axios from 'axios';

const CourseRetrieval = props=>{ 
	const defaultSemester = "202330";
	const defaultRegistrationStartDate1 = "2023-06-19";
	const defaultRegistrationStartDateAS = "2023-06-26";
	const defaultRegistrationStartDate2 = "2023-08-24";
	const defaultRegularStartDate = "2023-09-05";
	const defaultRegularEndDate = "2023-12-04";
	const defaultRegularExamStartDate = "2023-12-05";
	const defaultRegularExamEndDate = "2023-12-16";
	const defaultIsScrape = false;


	const [semester, setSemester] = useState(defaultSemester);
	const [registrationStartDate1, setRegistrationStartDate1] = useState(defaultRegistrationStartDate1);
	const [registrationStartDateAS, setRegistrationStartDateAS] = useState(defaultRegistrationStartDateAS);
	const [registrationStartDate2, setRegistrationStartDate2] = useState(defaultRegistrationStartDate2);
	const [regularStartDate, setRegularStartDate] = useState(defaultRegularStartDate);
	const [regularEndDate, setRegularEndDate] = useState(defaultRegularEndDate);
	const [regularExamStartDate, setRegularExamStartDate] = useState(defaultRegularExamStartDate);
	const [regularExamEndDate, setRegularExamEndDate] = useState(defaultRegularExamEndDate);
	const [isScrape, setIsScrape] = useState(defaultIsScrape);
	 

    const createSemester = (courseSchedules) => {
		axios.post('/api/v1/schedule/',
				{semester: semester,
				 courseCount: courseSchedules.length,
				 registrationStartDate1: registrationStartDate1,
				 registrationStartDateAS: registrationStartDateAS,
				 registrationStartDate2: registrationStartDate2,
				 regularStartDate: regularStartDate,
				 regularEndDate: regularEndDate,
				 regularExamStartDate: regularExamStartDate,
				 regularExamEndDate: regularExamEndDate,
				 courseSchedules: courseSchedules
				}, 
				{  headers: {'Content-Type': 'application/json'} }
			)
			.then(results => {
				console.log("post successfully", results);
			})
			.catch(error=>console.log("error",error))
	  };
	
	
	const submitSemester = async event => { 
		event.preventDefault();
		console.log(registrationStartDate1)

		axios.get(`/api/v1/schedule/scrape/${semester}`)
		.then(result=>{
			console.log(result.data);
			let courses = result.data;

			axios.post(`/api/v1/schedule/course/delete/${semester}`,{}, {  headers: {'Content-Type': 'application/json'} })
				.then(result=>{ console.log(result); 
					
					const promises = [];
					let coursesObjArr = [];
			
					for( let course of courses){
						promises.push(axios.post(`/api/v1/schedule/course/${semester}`,course, {  headers: {'Content-Type': 'application/json'} })
						.then(result=>{ console.log(result.data.data);coursesObjArr.push(result.data.data._id) })
						.catch(error => {console.log(error)}));
					}
					
					Promise.all(promises)
						.then((results) => {
							console.log("All done", results);
							console.log(coursesObjArr);
							createSemester(coursesObjArr);
						})
						.catch((e) => {
							error => {console.log(error)}
						});
					
					
				 })
				.catch(error => {console.log(error)})

				
		})
        .catch(error => {console.log(error)});
	}

	return (<div><h2> Semester Course Schedule </h2>
		<form onSubmit={event=>submitSemester(event)}> 
			<label> Semester &nbsp;
			<input type="text" value={semester} onChange={event=>setSemester(event.target.value)} /></label>  <br />
			<label> Registration Period 1 Start Date &nbsp;
			<input type="date" value={registrationStartDate1} onChange={event=>setRegistrationStartDate1(event.target.value)} /></label> <br />
			<label> Arts and Science Registration Start Date &nbsp;
			<input type="date" value={registrationStartDateAS} onChange={event=>setRegistrationStartDateAS(event.target.value)} /></label> <br />
			<label> Registration Period 2 Start Date &nbsp;
			<input type="date" value={registrationStartDate2} onChange={event=>setRegistrationStartDate2(event.target.value)} /></label> <br />
			<label> Start Date for Regular Semester &nbsp;
			<input type="date" value={regularStartDate} onChange={event=>setRegularStartDate(event.target.value)} /></label> <br />
			<label> End Date for Regular Semester &nbsp;
			<input type="date" value={regularEndDate} onChange={event=>setRegularEndDate(event.target.value)} /></label> <br />
			<label> Start Date for Regular Exam &nbsp;
			<input type="date" value={regularExamStartDate} onChange={event=>setRegularExamStartDate(event.target.value)} /></label> <br />
			<label> End Date for Regular Exam &nbsp;
			<input type="date" value={regularExamEndDate} onChange={event=>setRegularExamEndDate(event.target.value)} /></label> <br />
			<label> Scrape Data? &nbsp;
			<input type="checkbox" checked={isScrape} onChange={event=>setIsScrape(!isScrape)} /></label> <br />
			<button type="submit">Submit</button>
		</form> 
		</div>
		);


	

        // <button onClick={event=>props.chooseBreed(event, breed)}>{breed}
	// note in JSX use className instead of class, {}embed js codes
	// react wants a key in list (update faster)  else have warning in console
}
export default CourseRetrieval;
