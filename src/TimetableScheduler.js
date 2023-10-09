import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import {
  ViewState,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  AppointmentForm,
  AppointmentTooltip,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
//https://codesandbox.io/s/spzu21?file=/demo.js:0-4146
const PREFIX = 'TimetableScheduler';

const classes = {
  toolbarRoot: `${PREFIX}-toolbarRoot`,
  progress: `${PREFIX}-progress`,
};

const StyledDiv = styled('div')({
  [`&.${classes.toolbarRoot}`]: {
    position: 'relative',
  },
});

const StyledLinearProgress = styled(LinearProgress)(() => ({
  [`&.${classes.progress}`]: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
  },
}));

const PUBLIC_KEY = 'AIzaSyBnNAISIUKe6xdhq1_rjor2rxoI3UlMY7k';
const CALENDAR_ID = 'f7jnetm22dsjc3npc2lu3buvu4@group.calendar.google.com';

// convert timetable days ("-TW----") to RRULE format ("TU,WE")
const convertDaysRule = (days) => {
    //M=Monday, T=Tuesday, W=Wednesday, R=Thursday, F=Friday, S=Saturday
    let daysArr = [];
    if (days[0]=='M') daysArr.push("MO");
    if (days[1]=='T') daysArr.push("TU");
    if (days[2]=='W') daysArr.push("WE");
    if (days[3]=='R') daysArr.push("TH");
    if (days[4]=='F') daysArr.push("FR");
    if (days[5]=='S') daysArr.push("SA");
    if (days[6] != undefined && days[6] !='-') daysArr.push("SU");
    return daysArr.join(',');
}
const convertCourseToAppointments = (course, regStart, regEnd) => {
    let scheduledAppointments = [];
    let unscheduledAppointments = [];
    for (let i=0; i < course.Details.length; i++){
        let appointment = {
            "title" :course.Subj + course.Crse + "-" + course.Sec,
            "type": course.Details[i].Type,
            "id": course.CRN * 10 + i,
            "location": course.Details[i].Room,
            "instructor": course.Details[i].Instructor,
            "test" :regStart
        }

        let startDateStr = ""
        if(course.Details[i].NonStandardStart.trim() == ""){
            startDateStr = regStart.slice(0, 10);
        }else {
            startDateStr = new Date(course.Details[i].NonStandardStart).toISOString().slice(0, 10);
        }
        let endDateStr = startDateStr + "T" + course.Details[i].Time.substring(5,7) +":" + course.Details[i].Time.substring(7,9) +  ":00.000";
        startDateStr += "T" + course.Details[i].Time.substring(0,2) + ":" + course.Details[i].Time.substring(2,4) + ":00.000";
        appointment.startDate = new Date(startDateStr);
        appointment.endDate = new Date(endDateStr); 

        let byDayStr = convertDaysRule(course.Details[i].Days)
        if(byDayStr.length==0){
            unscheduledAppointments.push(appointment);
        } else {
            let untilDate = new Date();
            if(course.Details[i].NonStandardEnd.trim() == ""){
                untilDate = regEnd;
            }else {
                untilDate = new Date(course.Details[i].NonStandardEnd).toISOString();
            }
            let d = untilDate;
            let rRuleStr = "FREQ=WEEKLY;UNTIL=" + d.substring(0,4)+d.substring(5,7)+d.substring(8,10) + "T235959;BYDAY=" + byDayStr;
            appointment.rRule = rRuleStr;
            scheduledAppointments.push(appointment);
        }
    }
    return {"scheduledAppointments":scheduledAppointments,"unscheduledAppointments":unscheduledAppointments};
}

const convertCourses = async (selectedCourse, regularStartDate, regularEndDate) => {
    let appointments = selectedCourse.map(course => convertCourseToAppointments(course, regularStartDate, regularEndDate)).flat(1)
    return {"scheduledAppointments":appointments.map(a=>a.scheduledAppointments).flat(1),"unscheduledAppointments":appointments.map(a=>a.unscheduledAppointments)};
// }
};

// {
//     let scheduledAppointments = [];
//     let unscheduledAppointments = [];
//     for(let i=0; i < selectedCourse; i++){
//         let course = selectedCourse[i];
//         let courseAppointments = await convertCourseToAppointments(course, regularStartDate, regularEndDate);
//         scheduledAppointments.push(...courseAppointments.scheduledAppointments);
//         unscheduledAppointments.push(...courseAppointments.unscheduledAppointments);
//     }
//     return {"scheduledAppointments":scheduledAppointments,"x":0,"unscheduledAppointments":unscheduledAppointments};
// }

const getData = (setData, setLoading, course, regStart, regEnd) => {
  setLoading(true);

  return convertCourses(course, regStart, regEnd)
    .then((data) => {
      setTimeout(() => {
        setData(data);
        setLoading(false);
      }, 600);
    });
};

const ToolbarWithLoading = (
  ({ children, ...restProps }) => (
    <StyledDiv className={classes.toolbarRoot}>
      <Toolbar.Root {...restProps}>
        {children}
      </Toolbar.Root>
      <StyledLinearProgress className={classes.progress} />
    </StyledDiv>
  )
);

const usaTime = date => new Date(date).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });

const renderTooltip = (({
    children, appointmentData, ...restProps
  }) => (
    <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
    <Grid container alignItems="center">
      <Grid item xs={2}>
        <span>Type: </span>
      </Grid>
      <Grid item xs={10}>
        <span>{appointmentData.type}</span>
      </Grid>
    </Grid>
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <span>Location: </span>
        </Grid>
        <Grid item xs={10}>
          <span>{appointmentData.location}</span>
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <span>Instructor: </span>
        </Grid>
        <Grid item xs={10}>
          <span>{appointmentData.instructor}</span>
        </Grid>
      </Grid>
    </AppointmentTooltip.Content>
  ));

  const renderAppointment = (model) => {
    return (
        <>
            <div> {model.data.title}</div>
            <i>{model.data.type}</i>
            <p>Location: ${model.data.location}</p>
            <p>Instructor: ${model.data.instructor}</p>
        </>
    );
}
const AppointmentContent = ({ style, ...restProps }) => {
    return (
        <Appointments.AppointmentContent {...restProps}>
        <div className={restProps.container}>
            <strong style={{ "white-space": "break-spaces"}}>{restProps.data.title}</strong>
            <div style={{ color: "Yellow" }}>
                <strong>{restProps.data.type}</strong>
            </div>
            <div>
                <p>{restProps.data.startDate.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" })}<br/>-{restProps.data.endDate.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" })}</p>
                <p>{restProps.data.instructor}</p>
                <p>{restProps.data.location}</p>
            </div>
        </div>
        </Appointments.AppointmentContent>
    );
};


// const mapAppointmentData = appointment => ({
//   id: appointment.id,
//   startDate: usaTime(appointment.start.dateTime),
//   endDate: usaTime(appointment.end.dateTime),
//   title: appointment.summary,
// });

const initialState = {
  data: {"scheduledAppointments":[],"unscheduledAppointments":[]},
  loading: false,
  currentDate: '2023-09-23',
  currentViewName: 'Week',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setLoading':
      return { ...state, loading: action.payload };
    case 'setData':
      return { ...state, data: action.payload };
    case 'setCurrentViewName':
      return { ...state, currentViewName: action.payload };
    case 'setCurrentDate':
      return { ...state, currentDate: action.payload };
    default:
      return state;
  }
};

export default (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const {
    data, loading, currentViewName, currentDate,
  } = state;
  const setCurrentViewName = React.useCallback(nextViewName => dispatch({
    type: 'setCurrentViewName', payload: nextViewName,
  }), [dispatch]);
  const setData = React.useCallback(nextData => dispatch({
    type: 'setData', payload: nextData,
  }), [dispatch]);
  const setCurrentDate = React.useCallback(nextDate => dispatch({
    type: 'setCurrentDate', payload: nextDate,
  }), [dispatch]);
  const setLoading = React.useCallback(nextLoading => dispatch({
    type: 'setLoading', payload: nextLoading,
  }), [dispatch]);

  React.useEffect(() => {
    console.log(props.selectedCourse)
    let course = props.selectedCourse;
    let regularStartDate = props.regularStartDate;
    let regularEndDate = props.regularEndDate;
    getData(setData, setLoading, course, regularStartDate, regularEndDate);
  }, [props.selectedCourse]);


  React.useEffect(() => {
    setCurrentDate(props.regularStartDate);
  }, [props.regularStartDate]);
    
    
  
  return (
    <Paper>
        {console.log("Render")} {console.log(data)}
      <Scheduler
        data={data.scheduledAppointments}
        height={900}
        min-width={550}
        >
        <ViewState
          currentDate={currentDate}
          currentViewName={currentViewName}
          onCurrentViewNameChange={setCurrentViewName}
          onCurrentDateChange={setCurrentDate}
        />
        <DayView
          startDayHour={8.5}
          endDayHour={20.5}
        />
        <WeekView
          startDayHour={8.5}
          endDayHour={20.5}
        />
        <Appointments 
        appointmentContentComponent={AppointmentContent}
        
        // appointmentComponent={renderAppointment}
        // appointmentTooltipComponent={AppointmentTooltip}

        // appointmentComponent?: React.ComponentType<AppointmentsBase.AppointmentProps>;
        // /** A component that renders the appointment content. */
        // appointmentContentComponent?: React.ComponentType<AppointmentsBase.AppointmentContentProps>;
        // /** A component that renders an element which indicates the appointment is divided. */
        // splitIndicatorComponent?: React.ComponentType<AppointmentsBase.SplitIndicatorProps>;
        // /** A component that renders an icon for recurring appointments. */
        // recurringIconComponent?: React.ComponentType<object>;

        />
        <Toolbar
          {...loading ? { rootComponent: ToolbarWithLoading } : null}
        />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
        <AppointmentTooltip
          contentComponent={renderTooltip}
          showOpenButton
          showCloseButton
        />
        <AppointmentForm readOnly />
      </Scheduler>
    </Paper>
  );
};
