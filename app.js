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
const fs = require('fs');
const crypto = require('crypto')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const multer = require('multer')

// let mongoObjectId = require('mongodb').ObjectId;
// let mongodb = require('mongodb').MongoClient;

// USE CONFIG FILE
const environment = conf['prod']
const hostname = environment.app.host || null
const port = environment.app.port || process.env.PORT || 3000
const db = environment.app.db
const mySecret = environment.app.secret

// CCONNECT TO DB (EITHER LOCAL OR ONLINE)
var conn = mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
const mongooseUpload = mongoose.connection;

// ROUTES LOGIC
const patientRoutes = require('./routes/patients')
const diagnoseRoutes = require('./routes/diagnoses')
const treatmentRoutes = require('./routes/treatments')
const staffRoutes = require('./routes/staff')
const effectRoutes = require('./routes/effects')
const indexRoutes = require('./routes/index')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public'))) // __dirname starts where the script is running which in this particular case is routes
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


//UPLOAD FILE WITH GRIDFS
let gfs;
mongooseUpload.once('open', () => {
    // init stream
    gfs = Grid(mongooseUpload.db, mongoose.mongo)
    gfs.collection('uploads')
})
const storage = new GridFsStorage({
    url: db,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });
// @route GET/
// @desc Loads form

// @route POST /upload
// @desc Upload file to DB
app.post('/upload', upload.single('file'), (req, res) => {
    // res.json({ file: req.file })
    res.redirect('back')
})

// @route GET /files
// @desc Dsiplay all files in JSON
app.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        //Check if files
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            })
        }
        return res.json(files);
    })
})

// @route DELETE //files/:_id
// @desc Delete file
app.delete('/files/:id', (req, res) => {
    gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({ err: err })
        } else {
            res.redirect('/patients');
        }
    })
})

// @route GET /files/:filename
// @desc Dsiplay a single file in JSON
app.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exist'
            })
        }
        return res.json(file);
    })

})

// @route GET /files/:filename
// @desc Display image
app.get('/serve/:filename', (req, res) => {

    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        console.log(file)
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exist'
            })
        }
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read output to browser
            const readstream = gfs.createReadStream(file._id)
            readstream.pipe(res);
        } else if (file.contentType === 'application/pdf') {
            const readstream = gfs.createReadStream(file._id)
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: "Not an image"
            })
        }
    })

})

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