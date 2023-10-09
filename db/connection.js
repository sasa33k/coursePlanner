require('dotenv').config();
const mongoose = require("mongoose");

let mongoDB = process.env.DB_CONNECTION;

module.exports = mongoose.connect(mongoDB);