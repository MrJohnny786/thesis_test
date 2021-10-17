var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    methodOverride = require('method-override'),
    User = require('./models/user'),
    path = require('path'),
    conf = require("./config"),
    seedDB = require("./seed2");

// USE CONFIG FILE
const environment = conf[process.env.NODE_ENV]
const hostname = environment.app.host || null;
const port = environment.app.port || process.env.PORT || 3000;
const db = environment.app.db;
const mySecret = environment.app.secret

// CCONNECT TO DB (EITHER LOCAL OR ONLINE)
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

// ROUTES LOGIC
var patientRoutes = require("./routes/patients"),
    diagnoseRoutes = require("./routes/diagnoses"),
    treatmentRoutes = require("./routes/treatments"),
    staffRoutes = require("./routes/staff"),
    effectRoutes = require("./routes/effects"),
    indexRoutes = require("./routes/index");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
app.use(require("express-session")({
    secret: mySecret,
    resave: false,
    saveUninitialized: false
}));
app.locals.moment = require('moment');

// DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated.
mongoose.set('useFindAndModify', false);

// AUTH LOGIC
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// AUTH RESPONSE
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// ROUTES LOGIC
app.use("/patients", patientRoutes);
app.use("/patients/:id/diagnoses", diagnoseRoutes);
app.use("/patients/:id/diagnoses/:diagnose_1/treatments", treatmentRoutes);
app.use("/", indexRoutes);
app.use("/staff", staffRoutes)
app.use("/effects", effectRoutes)

//APP LISTENING
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// HEROKU LOGIC NEEDS FIX
// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("Started");
// });

// app.listen(process.env.PORT || 3000)

// const MongoClient = require('mongodb').MongoClient;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect(err => {
//     //   const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });