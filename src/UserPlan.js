import React from 'react'
const { useEffect, useState } = React;
import axios from 'axios';

const UserPlan = props=>{ 

	const [userEmail, setUserEmail] = useState('');
	const [currentUser, setCurrentUser] = useState('');
	const [userPlans, setUserPlans] = useState([]);
	const [currentPlanCRN, setCurrentPlanCRN] = useState([]);
	const [currentPlanId, setCurrentPlanId] = useState('');
	const [currentPlanDescription, setCurrentPlanDescription] = useState('');
	const [newPlanDescription, setNewPlanDescription] = useState('');
	const [newSubmittedPlanDescription, setSubmittedNewPlanDescription] = useState('');
	
	
	const submitUser = async (event) => { 
		event.preventDefault();
		// filter by semester?
		if(currentUser != ''){
			axios.post('/api/v1/course/user', {email: currentUser})
			.then(results => {
				// get user plans
				retrieveUserPlans();
			})
			.catch(error=>console.log("error",error))
		}
	};

	const retrieveUserPlans = () => { 
		// get user plans
		console.log(currentUser);
		console.log(props.semester);
		if(currentUser!='' && props.semester != undefined ){
			axios.post('/api/v1/course/userPlan', {email: currentUser, semester:props.semester})
			.then(results => {
				console.log(results.data.data[0])
				setUserPlans(results.data.data[0].plans);
				// setCurrentPlanCRN(results.data.data[0].plans[0].courses);
				setSelectedPlanCRN(results.data.data[0].plans[0].courses);
			})
			.catch(error=>console.log("error",error))
		}
	};
	useEffect(retrieveUserPlans, [props.semester, newSubmittedPlanDescription]);


	const changeCurrentSelection = async (planId) => { 
		console.log(planId);
		setCurrentPlanId(planId);
		setCurrentPlanDescription(userPlans.filter(p=>(p._id == planId))[0].description);
		setNewPlanDescription(userPlans.filter(p=>(p._id == planId))[0].description);
		// setCurrentPlanCRN(userPlans.filter(p=>(p._id == planId))[0].courses)
		props.setSelectedPlanCRN(userPlans.filter(p=>(p._id == planId))[0].courses)
		console.log(props.setSelectedPlanCRN);
	};


	const addUserPlan = async (event) => { 
		event.preventDefault();
		setSubmittedNewPlanDescription(newPlanDescription)
		// filter by semester?
		if(currentUser != ''){
			axios.post('/api/v1/course/userPlanUpdate', {
				email: currentUser,
				"plan": {
					"semester": props.semester,
					"description": newPlanDescription,
					"courses": props.selectedCRN
				}
			})
			.then(results => {
				// get user plans
				retrieveUserPlans();
				console.log(results)
			})
			.catch(error=>console.log("error",error))
		}
	};

	const updateUserPlan = async (planId) => { 
		if(currentUser != ''){
			axios.post('/api/v1/course/userPlanUpdate', {
				email: currentUser,
				"_id": planId,
				"plan": {
					"semester": props.semester,
					"description": newPlanDescription,
					"courses": props.selectedCRN
				}
			})
			.then(results => {
				// get user plans
				retrieveUserPlans();
				console.log(results)
			})
			.catch(error=>console.log("error",error))
		}
	};

	return (
		<div className='user'>
			<form onSubmit={event=>submitUser(event)}> 
				<label> Email &nbsp;
				<input type="text" disabled={currentUser==''?false:true} onChange={event=>setUserEmail(event.target.value)} /></label>  
				{ currentUser =='' ? <button type="submit" onClick={()=>setCurrentUser(userEmail)}>Submit</button> : <button onClick={()=>setCurrentUser('')}>Logout</button> }
				
			</form> 
			<div className='userPlan-btn'>
				{userPlans ==undefined ? '' : userPlans.map(p => (
					<button onClick={event=>changeCurrentSelection(event.target.value)}
					key={p._id} value={p._id}>{p.description}</button>
				))}
			</div>
			
			{ currentUser =='' || props.semester == '' ? '' :
				<div className='userPlan-update'>
					<label> Description &nbsp;
					<input type="text" value={newPlanDescription} onChange={event=>setNewPlanDescription(event.target.value)}/></label>  
					<button onClick={event=>addUserPlan(event)}>New Plan</button>
					{currentPlanDescription == ''?'':
						<button className='userSavePlan-btn' onClick={event=>updateUserPlan(currentPlanId)}>
							Save to {currentPlanDescription}
						</button>
					}
				</div>
			}
			{/* <div>
				<ul>{currentPlanCRN==undefined?'':currentPlanCRN.map(c => (<li>{c}</li>))}</ul>
			</div> */}

		</div>
	);
}
export default UserPlan;
