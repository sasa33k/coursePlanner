import React from 'react'
const { useEffect, useState } = React;
import axios from 'axios';
//mui
import {Box, InputLabel, MenuItem, FormControl, Select} from '@mui/material';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';


const TimetableSemesterSelection = props=>{ 

    const getCourseSchedules = (semCode) => {
		props.setSemester(semCode)
		props.setLoading(true);
		axios.get(`/api/v1/schedule/${semCode}`)
		// axios.get(`https://course-planner-58sw.onrender.com/api/v1/schedule/${semCode}`, {
		// 	headers: {
		// 	'Access-Control-Allow-Origin': '*',
		// 	},
		// 	proxy: {
		// 		host: 'localhost',
		// 		port: 8080
		// 	}
		// 	})
			.then(results => {
				props.setCourseSchedules(results.data.data);
				console.log("post successfully", results.data.data);
				props.setLoading(false);
			})
			.catch(error=>console.log("error",error))
	  };
	

	return (<>
		<Box sx={{ width: '100%' }}>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Semester</InputLabel>
				<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={props.semester}
				label="Semester"

				onChange={event=>getCourseSchedules(event.target.value)}
				>
				<MenuItem value={'202130'}>TEST 2021</MenuItem>
				<MenuItem value={'202310'}>SPRING SEMESTER 2023</MenuItem>
				<MenuItem value={'202320'}>SUMMER SEMESTER 2023</MenuItem>
				<MenuItem value={'202330'}>WINTER SEMESTER 2023</MenuItem>
				<MenuItem value={'202410'}>SPRING SEMESTER 2024</MenuItem>
				</Select>

				{/* <TextField label="Total Number of Courses" defaultValue={props.courseSchedules==undefined?'':props.courseSchedules.courseCount} disabled id="outlined-disabled"/> */}
			</FormControl>
			</Box>
		</>
		);


	

        // <button onClick={event=>props.chooseBreed(event, breed)}>{breed}
	// note in JSX use className instead of class, {}embed js codes
	// react wants a key in list (update faster)  else have warning in console
}
export default TimetableSemesterSelection;
