import React from 'react'
const { useEffect, useState } = React;
import axios from 'axios';
//mui
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

function formatDate(dateStr){
	let d = new Date(dateStr)
	return d.toLocaleDateString('en-US', {
		day: 'numeric', month: 'short', year: 'numeric'
	  })
}
const TimetableSemesterOverview = props=>{ 
	return (<>
			<Box className="sem-overview">
			<FormControl fullWidth>
				<TextField label="Semester Code" value={props.courseSchedules==undefined?'':props.courseSchedules.semester} disabled id="outlined-disabled"/>
				<TextField label="Total Number of Courses" value={props.courseSchedules==undefined?'':props.courseSchedules.courseCount} disabled id="outlined-disabled"/>
				<TextField label="Regular Semester Start Date" value={props.courseSchedules==undefined?'':props.courseSchedules.regularStartDate} disabled id="outlined-disabled"/>
				<TextField label="Regular Semester End Date" value={props.courseSchedules==undefined?'':props.courseSchedules.regularEndDate} disabled id="outlined-disabled"/>
			</FormControl>
			</Box>
		</>
		);

}
export default TimetableSemesterOverview;
	
