import React from 'react'
const { useEffect, useState } = React;
import axios from 'axios';
//mui
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Grid } from "@mui/material";
import {
	DataGrid,
	GridToolbarQuickFilter, GridToolbar
  } from '@mui/x-data-grid';
// import Typography from "@material-ui/core/Typography";

function QuickSearchToolbar() {
	return (
	  <Box
		sx={{
		  p: 0.5,
		  pb: 0,
		}}
	  >
		<GridToolbarQuickFilter
			quickFilterParser={(searchInput) =>
			searchInput
				.split(',')
				.map((value) => value.trim())
				.filter((value) => value !== '')
			}
		/>
	  </Box> 
	);
  }
  
// const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];
const columns = [
	{ field: 'CRN', headerName: 'CRN', minWidth: 50, maxWidth:60 },
	{ field: 'Cred', headerName: 'Credit', minWidth: 40, maxWidth:50 },
	{ field: 'Crse', headerName: 'Course', minWidth: 120, maxWidth:120,
		valueGetter: (params) => {
		return `${params.row.Subj || ''}${params.row.Crse || ''}${'-'+params.row.Sec || ''}`;
		},
	},
	{ field: 'Title', headerName: 'Title', minWidth: 150 },
	{ field: 'Details', headerName: 'Details', minWidth: 400,
		renderCell: (params) => (
		<div>
			{params.value.map((item,index)=>{
				return <li key={index}>{item.Type} | {item.Days} | {item.Time} | {item.Room} | {item.Instructor} {item.nonStandardStart==undefined||item.nonStandardStart==''?'':'|'+item.nonStandardStart}{item.nonStandardEnd==undefined||item.nonStandardEnd==''?'':'-'+item.nonStandardEnd}</li>
			})}
		</div>
		)
	},
	{ field: 'Instructors', headerName: 'Instructors', minWidth: 200,
		valueGetter: (params) => {
			let instructors = params.row.Details.map((item,index)=>{return item.Instructor.split(', ')});
			let uniq = [...new Set(instructors.flat(1))]
		return `${uniq.join(', ') || ''}`
		},
		cellClassName: 'tblCell-timetableCourses',
	}
  ]

 function getRowId(row) {
	return row.CRN;
  }

// function courseToAppointments(course){ // a single course object
// 	[
// 		{
// 			"CRN": "30918",
// 			"Subj": "ABST",
// 			"Crse": "1100",
// 			"Sec": "001",
// 			"Cred": "3.00",
// 			"Title": "Canadian Aboriginal Experience",
// 			"Details": [
// 				{
// 					"Type": "Lecture",
// 					"Days": "-T-----",
// 					"Time": "1030-1320",
// 					"NonStandardStart": " ",
// 					"NonStandardEnd": " ",
// 					"Room": " ",
// 					"Instructor": " "
// 				},
// 				{
// 					"Type": "Lab",
// 					"Days": "-T-----",
// 					"Time": "1030-1320",
// 					"NonStandardStart": " ",
// 					"NonStandardEnd": " ",
// 					"Room": " ",
// 					"Instructor": " "
// 				}
// 			]
// 		}
// 	]
// }
  
const TimetableCourseList = props=>{ 
	const data = props.courseSchedules.courseSchedules.map(o=>o.sections).flat(1); //.map(d=> {d.Details = JSON.stringify(d.Details); return d;});

	// const data = [
	// 	{"id":1, "title":"a", "body":"aa"},
	// 	{"id":2, "title":"b", "body":"aab"},
	// 	{"id":3, "title":"c", "body":"aac"},
	// ]
	
	//   // Otherwise filter will be applied on fields such as the hidden column id
	//   const columns = React.useMemo(
	// 	() => data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
	// 	[data.columns],
	//   );
	


	return (<div><h3> Course List </h3>

{/*  */}
			<Box sx={{ "max-width": 900 }}>
			<DataGrid getRowId={getRowId}
				className='tbl-timetableCourses'
				autoHeight
				// disableColumnFilter
				checkboxSelection
				// disableColumnSelector
				// disableDensitySelector
        		rows={data}
				columns={columns}
				initialState={{
					filter: {
					  filterModel: {
						items: [],
						quickFilterValues: [],
					  },
					},
					pagination: { paginationModel: { pageSize: 15 } },
				  }}
				
				slots={{ toolbar: GridToolbar }}
				slotProps={{
				  toolbar: {
					showQuickFilter: true,
				  },
				}}

				onRowSelectionModelChange={(ids) => {
				const selectedIDs = new Set(ids);
				const selectedRows = data.filter((row) =>
					selectedIDs.has(getRowId(row))
				);
				console.log("changed");
				props.setSelectedCourse(selectedRows);
				console.log(props.selectedCourse);
				}}
			/>
			</Box>
		</div>
		);


		// initialState = {{
		// 	filter: {
		// 	  filterModel:{
		// 		   items: [{
		// 			   columnField: 'class_end_date',
		// 			   operatorValue: 'onOrAfter',
		// 			   value: `${formatDate(new Date())}`
		// 		   }],
		// 	  }
		// 	 }
		//   }}
		// initialState={{
		// ...data.initialState,
		// filter: {
		// 	...data.initialState?.filter,
		// 	filterModel: {
		// 	items: [],
		// 	quickFilterLogicOperator: GridLogicOperator.Or,
		// 	},
		// }, 
		// }}
	

        // <button onClick={event=>props.chooseBreed(event, breed)}>{breed}
	// note in JSX use className instead of class, {}embed js codes
	// react wants a key in list (update faster)  else have warning in console
}
export default TimetableCourseList;
