const express = require('express')
const router = express.Router({ mergeParams: true })

const Patient = require('../models/patient')
const Diagnose = require('../models/diagnose')
const middleware = require('../middleware')
const Staff = require('../models/staff')

/**
 * The route name directing us to the page where we create new diagnoses.
 * Checks is you are logged in to perform this action.
 * Gets the id of the Patient to find him on the MongoDB for needed data.
 * Responds sending back the Patient data and the Staff-Doctors Data.
 */
router.get('/new', middleware.isLoggedIn, function(req, res) {
        Patient.findById(req.params.id, function(err, patient) {
            if (err) {
                console.log(err)
                res.redirect('/patients')
            } else {
                Staff.find({ role: 'Γιατρος' }, function(err, findDoctors) {
                    if (err) {
                        console.log(err)
                    } else {
                        res.render('diagnoses/new', { patient: patient, doctors: findDoctors })
                    }
                })
            }
        })
    })
    /**
     * Post Route to create new Diagnose and bind it to the current patient.
     * Find the patient we are looking for.
     * Create a new diagnose from the data we got from the req.body.
     * Add the author and push the diagnose to the array of diagnoses.
     */
router.post('/', middleware.isLoggedIn, function(req, res) {
    // lookup patient using ID
    Patient.findById(req.params.id, function(err, patient) {
        if (err) {
            console.log(err)
            res.redirect('/patients')
        } else {
            // console.log(req.body.diagnose);
            Diagnose.create(req.body.diagnose, function(err, diagnose) {
                if (err) {
                    req.flash('error', 'Δημιουργηθηκε καποιο προβλημα')
                    console.log(err)
                } else {
                    diagnose.alpha.id = req.user._id
                    diagnose.alpha.username = req.user.username
                    diagnose.save()

                    patient.diagnoses.push(diagnose)
                    patient.save()
                    req.flash('success', 'Δημιουργήθηκε καινούρια Ανοσοθεραπεία.')
                    res.redirect('/patients/' + patient._id)
                }
            })
        }
    })
})

/**
 * Route that returns the data of a single patient based on his id.
 */
router.get('/:diagnose_id', function(req, res) {
    Diagnose.findById(req.params.diagnose_id).populate('treatments').exec(function(err, foundDiagnose) {
        if (err) {
            res.redirect('/patients')
        } else {
            res.render('diagnoses/show', { patient_id: req.params.id, diagnose: foundDiagnose })
        }
    })
})

/**
 * Route directing us to the edit page of the diagnose that we chose.
 * Authorization check is applied.
 */
router.get('/:diagnose_id/edit', middleware.checkDiagnoseOwnership, function(req, res) {
    Diagnose.findById(req.params.diagnose_id, function(err, foundDiagnose) {
        if (err) {
            console.log(err)
            res.redirect('/patients')
        } else {
            Staff.find({ role: 'Γιατρος' }, function(err, findDoctors) {
                if (err) {
                    res.redirect('/patients')
                } else {
                    res.render('diagnoses/edit', { patient_id: req.params.id, diagnose: foundDiagnose, doctors: findDoctors })
                }
            })
        }
    })
})

/**
 * Route that updated a diagnose after we are done editing it.
 * Authorization check is applied.
 */
router.put('/:diagnose_id', middleware.checkDiagnoseOwnership, function(req, res) {
    Diagnose.findByIdAndUpdate(req.params.diagnose_id, req.body.diagnose, function(err, updatedDiagnose) {
        if (err) {
            res.redirect('back')
            console.log(err)
        } else {
            res.redirect('/patients/' + req.params.id + '/diagnoses/' + req.params.diagnose_id)
        }
    })
})

/**
 * Deleting a diagnose based on the id we have given.
 * Authorization check is applied.
 */
router.delete('/:diagnose_id', middleware.checkDiagnoseOwnership, function(req, res) {
    Diagnose.findByIdAndRemove(req.params.diagnose_id, function(err) {

        if (err) {
            //console.log('Failed')
            res.redirect('back')
        } else {
            // console.log('success')
            res.redirect('/patients/' + req.params.id)
        }
    })
})

module.exports = router