var express = require("express");
var router = express.Router();

var Patient = require("../models/patient")
var Diagnose = require("../models/diagnose")
var Treatment = require("../models/treatment");
var middleware = require('../middleware');
var Calendar = require('../models/calendar');


router.get("/", function(req, res){
    res.render("calendar/index.ejs") });
    
    
    
    
module.exports = router;
