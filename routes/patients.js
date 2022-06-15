const express = require('express')
const router = express.Router()
const Patient = require('../models/patient')
const Staff = require('../models/staff')
const Treatment = require('../models/treatment')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const middleware = require('../middleware')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const staticEffects = require('../public/effects.json')





// // Init Storage *Needs to be refactored for better naming of the uploaded files :)
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const id = req.url.replace('/', '')
//         Patient.findById(id, function(err, user) {
//             const patient_name = user.firstName
//             const patient_lastname = user.lastName
//             const pname = patient_lastname + ' ' + patient_name + ' ' + id
//             const dir = `./public/uploads/${pname}`
//             if (err) {
//                 return fs.mkdir(dir, error => cb(error, dir))
//             } else {
//                 fs.exists(dir, exist => {
//                     if (!exist) {
//                         return fs.mkdir(dir, error => cb(error, dir))
//                     }
//                     return cb(null, dir)
//                 })
//             }
//         })
//     },
//     filename: function(req, file, cb) {
//         const id = req.url.replace('/', '')
//         Patient.findById(id, function(err, user) {
//             if (err) {
//                 cb(null, '-' + path.extname(file.originalname))
//             } else {
//                 const patient_name = user.firstName
//                 const patient_lastname = user.lastName
//                 const pname = patient_lastname + ' ' + patient_name
//                 const timestamp = Date.now()
//                 const date = new Date(timestamp) //Changed from date , to const date.
//                 const date_c = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getHours() + '-' + date.getMinutes()
//                 cb(null, pname + '-' + date_c + path.extname(file.originalname))
//             }
//         })
//     }
// })

// // Init Upload
// const upload = multer({

//     storage: storage,
//     limits: { fileSize: 1000000 },
//     fileFilter: function(req, file, cb) {
//         checkFileType(file, cb)
//     }
// }).single('myImage')

// // Check File Type
// function checkFileType(file, cb) {
//     // Allowed ext
//     const filetypes = /jpeg|jpg|png|pdf|doc|docx/
//         // Check ext
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//         // Check mime
//     const mimetype = filetypes.test(file.mimetype)
//     if (extname) {
//         return cb(null, true)
//     } else {
//         cb('Error: File problem!')
//     }
// }

/**
 * Return every Patient in the database.
 * @param  {} '/getpatients'
 * @param  {} middleware.isLoggedIn Checks if you are logged in to perform this action.
 */
router.get('/getpatients', middleware.isLoggedIn, (req, res) => {
    Patient.find({}, (err, diagnoseData) => {
        if (err) {
            res.json({ msg: 'error' })
        } else {
            res.json({ msg: 'success', data: diagnoseData })
        }
    })
})

/**
 * Return all the Patients from the Database.
 * @param  {} "/" The route name for returning all the patients.
 */
router.get('/', function(req, res) {
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi')
        Patient.find({ lastName: regex }, function(err, allPatients) {
            if (err) {
                console.log(err)
            } else {
                res.render('patients/index', { patients: allPatients })
            }
        })
    } else if (req.query.search1) {
        const regex = new RegExp(escapeRegex(req.query.search1), 'gi')
        Patient.find({ doc: regex }, function(err, allPatients) {
            if (err) {
                console.log(err)
            } else {
                res.render('patients/index', { patients: allPatients })
            }
        })
    } else {
        // Get all patient from DB
        Patient.find({}, function(err, allPatients) {
            if (err) {
                console.log(err)
            } else {
                res.render('patients/index', { patients: allPatients })
            }
        })
    }
})

/**
 * @param  {} "/" Route for posting a new Patient.
 * @param  {} middleware.isLoggedIn Checks if you are logged in to perform this action.
 * @param  {} function(req Gives as all the data from the form in order to create a new Patient
 * @param  {} res Redirect to /patients.
 */
router.post('/', middleware.isLoggedIn, function(req, res) {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const patronym = req.body.patronym
    const birthday = req.body.birthday // to do:   change how is the format of User Interface
        // var fomatted_date = moment(birthday).format('YYYY-DD-MM');
    const weight = req.body.weight
    const height = req.body.height
    const p_am = req.body.patientAM
    const mPhone = req.body.mPhone
    const sPhone = req.body.sPhone
    const city = req.body.city
    const address = req.body.address
    const bloodType = req.body.bloodType
    const doc = req.body.doc
    const general = req.body.general
    const author = {
        id: req.user._id,
        username: req.user.username
    }
    const newPatient = {
        firstName: firstName,
        lastName: lastName,
        patronym: patronym,
        birthday: birthday,
        weight: weight,
        height: height,
        patientAM: p_am,
        general: general,
        author: author,
        mPhone: mPhone,
        sPhone: sPhone,
        city: city,
        address: address,
        bloodType: bloodType,
        doc: doc
    }

    Patient.create(newPatient, function(err, newlyCreated) {
        if (err) {
            res.redirect('/patients')
        } else {
            res.redirect('/patients')
        }
    })
})

// I dont remember if that is needed.
// router.post("/", middleware.isLoggedIn, function(req, res) {
//     res.render("patients/new.ejs");
// });

/**
 * @param  {} "/new" Directs to the view in order to create a Patient.
 * @param  {} middleware.isLoggedIn Checks if you are logged in to perform this action.
 * @param  {} res Returns all the doctors found in the database.
 */
router.get('/new', middleware.isLoggedIn, function(req, res) {
    Staff.find({ role: 'Γιατρος' }, function(err, allStaff) {
        if (err) {
            console.log(err)
        } else {
            res.render('patients/new.ejs', { doctors: allStaff })
        }
    })
})

// Upload logic  *Careful redirect logic has been implemented which is not the best , needs refactoring
/**
 * @param  {id"} "/ Uploads a file depending on the Patient's id
 * @param  {} middleware.checkPatientOwnership Checks if the the one who is trying to upload something is the owner of the Patient posted.
 * @param  {} function(req contains the id of the patient
 * @param  {} res redirects depending on the outcome.
 */
router.post('/:id', middleware.checkPatientOwnership, function(req, res) {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
            res.redirect('/patients/' + req.params.id)
        } else {
            if (req.file == undefined) {
                console.log('no file found')
                res.redirect('/patients/' + req.params.id)
            } else {
                res.redirect('/patients/' + req.params.id)
            }
        }
    })
})
const mongooseUpload = mongoose.connection;
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')

let gfs;
mongooseUpload.once('open', () => {
    // init stream
    gfs = Grid(mongooseUpload.db, mongoose.mongo)
    gfs.collection('uploads')
})

/**
 * @param  {id"} "/ Route that gets the data for the correct patient id.
 * @param  {} res Returns the show view with the patient data.
 */
router.get('/:id', function(req, res) {
    var data = {}
    const testFolder = path.join(__dirname, '../public/uploads/');

    Patient.findById(req.params.id).populate('diagnoses').exec(function(err, foundPatient) {
        if (err) {
            console.log(err)
        } else {

            ////////////////////// SHOW FILES
            var allFiles;
            gfs.files.find({ aliases: req.params.id }).toArray((err, files) => {
                //Check if files
                if (!files || files.length === 0) {
                    oneFile = false
                } else {
                    files.map(file => {
                        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
                            file.isImage = true
                        } else {
                            file.isImage = false
                        }
                    })
                    allFiles = files
                }

            })


            ////////////////////
            var folderName = foundPatient.lastName + ' ' + foundPatient.firstName + ' ' + foundPatient._id
            folderName = testFolder.concat(folderName)
            if (fs.existsSync(folderName)) {
                var folderContents = []
                fs.readdirSync(folderName).forEach(file => {
                    var objFile = {
                        path: folderName,
                        file: file
                    }
                    folderContents.push(objFile)
                });
            } else {
                var folderContents = []
            }
            data['patient'] = foundPatient

            var treats = foundPatient.diagnoses.map(x => {
                var n = {}
                n[x._id] = x.treatments
                return n
            })
            data['diagnose'] = treats
            var treat = foundPatient.diagnoses.map(x => {
                return x.treatments
            })

            var merged = [].concat.apply([], treat);
            var genre = ['pancreas', 'eyesight', 'muscle', 'skin', 'lungs', 'stomach_bowel']
            Treatment.find().where('_id').in(merged).populate('effects').exec(function(err, foundTreatment) {
                data['treatment'] = foundTreatment
                res.render('patients/show', { patient: foundPatient, data: data, effects: staticEffects, folderContents: folderContents, allFiles: allFiles, host: req.headers.host })
            })

        }
    })
})

/**
 * @param  {id/edit"} "/ Edit route to edit the Patient based on the id.
 * @param  {} middleware.checkPatientOwnership Checks if you created the Patient.
 * @param  {} res Returns the patient_id , the current data of the patient and all the doctors to the edit view.
 * Needs proper error handling.
 */
router.get('/:id/edit', middleware.checkPatientOwnership, function(req, res) {
    Patient.findById(req.params.id, function(err, foundPatient) {
        Staff.find({ role: 'Γιατρος' }, function(err, allStaff) {
            if (err) {
                console.log(err)
            } else {
                res.render('patients/edit', { p_id: req.params.id, patient: foundPatient, doctors: allStaff })
            }
        })
    })
})

/**
 * Route that updated a patient after we are done editing it.
 * Authorization check is applied.
 */
router.put('/:id', middleware.checkPatientOwnership, function(req, res) {
    Patient.findByIdAndUpdate(req.params.id, req.body.patient, function(err, updatedPatient) {
        if (err) {
            res.redirect('/patients')
            console.log(err)
        } else {
            res.redirect('/patients/' + req.params.id)
        }
    })
})

/**
 * Deleting a patient based on the id we have given.
 * Authorization check is applied.
 */
router.delete('/:id', middleware.checkPatientOwnership, function(req, res) {
    Patient.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect('/patients')
        } else {
            res.redirect('/patients')
        }
    })
})

/**
 * Find patients name logic with regex
 */
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}
// IN PROGRESS WORK FOR DOWNLOADING A FILE
// // Trying to download a file.
// router.get('/downloaded', function(req, res) {

//     // console.log('download')
//     // const file = req.data;
//     // res.download('D:/Downloads/Sample_CV.pdf'); // Set disposition and send it.
//     res.download('D:/Downloads/Sample_CV.pdf', 'Sample_CV.pdf', function(err) {
//         if (err) {
//             console.log(err)
//                 // Handle error, but keep in mind the response may be partially-sent
//                 // so check res.headersSent
//             res.redirect('/patients')
//         } else {
//             // decrement a download credit, etc.
//             res.redirect('back')
//         }
//     })
// });

router.get('/downloade', function(req, res) {

    var file = 'D:/Downloads/Sample_CV.pdf'

    var filename = path.basename(file);
    var mimetype = mime.lookup(file);

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);

    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
});

// var url = 'C:\Users\Johnny786\github\thesis_test\public\uploads\ΚΑΤΩΓΙΑΣ ΚΑΤΩΓΙΑΣ 61eef87a86dfcc00041a57ac\ΚΑΤΩΓΙΑΣ ΚΑΤΩΓΙΑΣ-2022-1-27-17-19.pdf'
// https.get(url,(res) => {
//     // Image will be stored at this path
//     const path = `${__dirname}/files/img.jpeg`; 
//     const filePath = fs.createWriteStream(path);
//     res.pipe(filePath);
//     filePath.on('finish',() => {
//         filePath.close();
//         console.log('Download Completed'); 
//     })
// })




module.exports = router