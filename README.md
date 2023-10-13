# Build Instruction
- download the project and put into your workspace
- Update your configurations in termProj/.env
    - PORT
    - DB_CONNECTION (Using MongoDB Atlas, after you create your custer, click connect > connect your application and copy the connection string), format would be similar to following, adding db name
```
mongodb+srv://{username}:{password}@cluster0.xxxxxxx.mongodb.net/{dbname}?retryWrites=true&w=majority
```


- navigate to the workspace and run the following command to install required libraries
```
npm install
```
- For development, 
  - open first terminal and run 
```
npm run dev
```
  - open second terminal and run 
```
npm run watch
```
access with url http://localhost:8080

- For general use, open terminal and run 
```
npm run build
node app.js
```

# Project Timeline
Started on 23 Sep night inspired from a hackathon event, for learning purpose only, working in leisure mode

## Phase 1: Semester Timetable Planner

### MVP 1: Semester Timetable Planner Basic
Students can select course section, add to calendar and display in timetable
- Day 1: Initiate Project, Define data structure and WebScrapping (with Selenium) for Course Schedule (L College)
- Day 2: Connection with MongoDB, define models, controllers and routes for saving and retreiving course semester schedule 
- Day 3: Integration - Saving scrapped data to DB, handle data update with Semester Code (re-scraping)
- Day 4: Initiate React Front End: display semester course sections available for selection
- Day 5: Investigate on React Calendar plugins and adding events to calender (single, recuring), define add event API
- Day 6-8: Integration - Parse selected section data for adding to events 
=== Planned === 
- Day 9-10: Review, Bug Fixing, Front End Design, Partial data scraping & updating (by subject), update semester dates only, scrape data count & show error, spring / winter break

### MVP 2: Semester Timetable Planner with mutiple plans for a semester
allow student to have multiple plans for a semester, saving & editing own record identified with email address
- Day 1: restructure course schema to prepare for user plan storage

### MVP 3: Semester Timetable Planner for multiple semesters

### MVP 4: Link with Rate My Professor
scrap for professor id & provide external link?
grap rating & display?

### MVP 5: External Courses


## Phase 2: Program Semester Planner

### MVP 1: Program curriculum and Course Pre-requisites retrieval & display
### MVP 2: Add Course to Semesters & Checking Logics (minimal conditions), Reports
### MVP 3: Multiple plans and semester timetable planner integration 
(** actual, planned with / without section available ** reference with previous year same semester sections available)
### MVP 4: External Courses/Exam/Grades, More complex logics for handling course / program conditions

## Phase 3 Login / Authentication
### MVP 1: G Login / Authentication