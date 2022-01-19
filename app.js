const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const methodOverride = require('method-override')
const User = require('./models/user')
const path = require('path')
const conf = require('./config')

// USE CONFIG FILE
const environment = conf['prod']
const hostname = environment.app.host || null
const port = environment.app.port || process.env.PORT || 3000
const db = environment.app.db
const mySecret = environment.app.secret

// CCONNECT TO DB (EITHER LOCAL OR ONLINE)
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })

// ROUTES LOGIC
const patientRoutes = require('./routes/patients')
const diagnoseRoutes = require('./routes/diagnoses')
const treatmentRoutes = require('./routes/treatments')
const staffRoutes = require('./routes/staff')
const effectRoutes = require('./routes/effects')
const indexRoutes = require('./routes/index')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')))
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
app.use(flash())
app.use(require('express-session')({
    secret: mySecret,
    resave: false,
    saveUninitialized: false
}))
app.locals.moment = require('moment')

// DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated.
mongoose.set('useFindAndModify', false)

// AUTH LOGIC
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// AUTH RESPONSE
app.use(function(req, res, next) {
    res.locals.currentUser = req.user
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    next()
})

// ROUTES LOGIC
app.use('/patients', patientRoutes)
app.use('/patients/:id/diagnoses', diagnoseRoutes)
app.use('/patients/:id/diagnoses/:diagnose_1/treatments', treatmentRoutes)
app.use('/', indexRoutes)
app.use('/staff', staffRoutes)
app.use('/effects', effectRoutes)

// APP LISTENING
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})

// // HEROKU LOGIC NEEDS FIX
// app.listen(process.env.PORT, process.env.IP, function() {
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