var express = require("express");
var router = express.Router();
var Patient = require("../models/patient");
var middleware = require('../middleware');
var multer = require('multer');
var path = require('path');

//Init Storage *Needs to be refactored for better naming of the uploaded files :)
const storage = multer.diskStorage({

    destination: './public/uploads/',
    filename: function(req, file, cb) {
        // var info = Patient.findById(req.params.id).exec(function(err, foundPatient){
        // 	console.log(foundPatient)
        // 	var data = foundPatient
        // 	return data
        // })
        // console.log('info', info)

        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|pdf|doc|docx/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (extname) {
        return cb(null, true);
    } else {
        cb('Error: File problem!');
    }
}

// Get all Patients
router.get("/", function(req, res) {
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Patient.find({ lastName: regex }, function(err, allPatients) {
            if (err) {
                console.log(err);
            } else {
                res.render("patients/index", { patients: allPatients });
            }
        });
    } else if (req.query.search1) {
        const regex = new RegExp(escapeRegex(req.query.search1), 'gi');
        Patient.find({ doc: regex }, function(err, allPatients) {
            if (err) {
                console.log(err);
            } else {
                res.render("patients/index", { patients: allPatients });
            }
        });
    } else {
        // Get all patient from DB
        Patient.find({}, function(err, allPatients) {
            if (err) {
                console.log(err);
            } else {
                res.render("patients/index", { patients: allPatients });
            }
        });
    }

});

// Create new Patient
router.post("/", middleware.isLoggedIn, function(req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    //var birthday = new Date();
    var birthday = req.body.birthday; // to do:   change how is the format of User Interface
    //var fomatted_date = moment(birthday).format('YYYY-DD-MM');
    var mPhone = req.body.mPhone;
    var sPhone = req.body.sPhone;
    var city = req.body.city;
    var address = req.body.address;
    var bloodType = req.body.bloodType;
    var doc = req.body.doc;
    var alerg1 = req.body.alerg1;
    var alerg2 = req.body.alerg2;
    var alerg1_text = req.body.alerg1_text;
    var alerg2_text = req.body.alerg2_text;
    var general = req.body.general;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newPatient = {
        firstName: firstName,
        lastName: lastName,
        birthday: birthday,
        general: general,
        author: author,
        mPhone: mPhone,
        sPhone: sPhone,
        city: city,
        address: address,
        bloodType: bloodType,
        alerg1: alerg1,
        doc: doc,
        alerg2: alerg2,
        alerg1_text: alerg1_text,
        alerg2_text: alerg2_text
    };

    Patient.create(newPatient, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/patients");
        }
    });

});

router.post("/", middleware.isLoggedIn, function(req, res) {
    res.render("patients/new.ejs");
});


router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("patients/new.ejs");
});

// Upload logic  *Careful redirect logic has been implemented which is not the best , needs refactoring
router.post("/:id", middleware.checkPatientOwnership, function(req, res) {
    upload(req, res, (err) => {
        if (err) {
            console.log('error')
            res.redirect('/patients/' + req.params.id);
        } else {
            if (req.file == undefined) {
                console.log('no file found');
                res.redirect('/patients/' + req.params.id);
            } else {
                res.redirect('/patients/' + req.params.id, );
            }
        }
    })
});

//Show Patient Route
router.get("/:id", function(req, res) {
    //find the patient with provided ID
    Patient.findById(req.params.id).populate("diagnoses").exec(function(err, foundPatient) {
        if (err) {
            console.log(err);
        } else {
            //console.log(foundPatient);
            //render show template with that patient
            res.render("patients/show", { patient: foundPatient });
        }
    });
});

// Edit Route
router.get("/:id/edit", middleware.checkPatientOwnership, function(req, res) {
    Patient.findById(req.params.id, function(err, foundPatient) {
        //console.log(req.params.id)
        res.render("patients/edit", { p_id: req.params.id, patient: foundPatient });
    });
});

// Update Route
router.put("/:id", middleware.checkPatientOwnership, function(req, res) {
    Patient.findByIdAndUpdate(req.params.id, req.body.patient, function(err, updatedPatient) {
        //console.log(req.body)
        if (err) {
            res.redirect("/patients");
            console.log(err)
        } else {
            res.redirect("/patients/" + req.params.id);
        }
    });
});

//Destroy Patient
router.delete("/:id", middleware.checkPatientOwnership, function(req, res) {
    Patient.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/patients");
        } else {
            res.redirect("/patients");
        }
    });
});


// Find patients name logic with regex
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router