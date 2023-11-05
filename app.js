const express = require('express');
const   bodyParser = require("body-parser"),
        swaggerJsdoc = require("swagger-jsdoc"),
        swaggerUi = require("swagger-ui-express");

const app = express();


// // app.use(cors());
// const corsOrigin ={
//     origin:'https://course-planner-58sw.onrender.com/', //or whatever port your frontend is using
//     credentials:true,            
//     optionSuccessStatus:200
// }
// app.use(cors(corsOrigin));


// app.use((req, res, next) => {
//     res.setHeader(
//       "Access-Control-Allow-Origin",
//       "https://localhost:8080/"
//     );
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
//     );
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
//     );
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     res.setHeader("Access-Control-Allow-Private-Network", true);
//     //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
//     res.setHeader("Access-Control-Max-Age", 7200);
  
//     next();
//   });

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "The Ultimate Recipe Hub API with Swagger",
            version: "0.1.0",
            description:
            "This is a simple CRUD API application made with Express and documented with Swagger",
            contact: {
                name: "Samantha Liu",
                email: "sliu010@mylangara.ca",
                },
            },
    },
    apis: ["./routes/*.js", "./models/*.js"],
};

const connection = require('./db/connection.js');

connection.then(()=>{
    const server = app.listen(process.env.PORT, ()=>{
        console.log("Connected and listening");
        console.log(new Date());        
        const specs = swaggerJsdoc(options);
        app.use(
            "/api-docs",
            swaggerUi.serve,
            swaggerUi.setup(specs)
        );
    });
});



app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());



const router = require("./routes/index.js");


const cors = require('cors');
app.use(cors({
    origin: '*'
}));
app.use('/api/v1', router); 