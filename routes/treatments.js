const express = require('express')
const router = express.Router({ mergeParams: true })
const Patient = require('../models/patient')
const Diagnose = require('../models/diagnose')
const Treatment = require('../models/treatment')
const middleware = require('../middleware')
const Staff = require('../models/staff')
const staticEffects = require('../public/effects.json')
var ObjectId = require('mongodb').ObjectID;

/**
 * Route to create new treatment.
 * Authentination check is applied.
 * Proper error handling is needed.
 */
router.get('/new', middleware.isLoggedIn, function(req, res) {
    Diagnose.findById(req.params.diagnose_1, function(err, diagnose) {
        Staff.find({ role: 'Νοσηλευτης' }, function(err, findStaff) {
            if (err) {
                console.log(err)
            } else {
                res.render('treatments/new', { patient_id: req.params.id, diagnose: diagnose, hosp_staff: findStaff })
            }
        })
    })
})

/**
 * Route that post new treatment on a specific diagnose.
 **/
router.post('/', middleware.isLoggedIn, function(req, res) {
    Patient.findById(req.params.id, function(err, patient) {
        if (err) {
            console.log(err)
            res.redirect('/patients')
        } else {
            Diagnose.findById(req.params.diagnose_1, function(err, diagnose) {
                if (err) {
                    console.log(err)
                    res.redirect('/diagnoses')
                } else {
                    Treatment.create(req.body.treatment, function(err, treatment) {
                        if (err) {
                            console.log(err)
                        } else {
                            treatment.beta.id = req.user._id
                            treatment.beta.username = req.user.username
                            treatment.save()
                            diagnose.treatments.push(treatment)
                            diagnose.save()
                            res.redirect('/patients/' + patient._id + '/diagnoses/' + diagnose.id)
                        }
                    })
                }
            })
        }
    })
})

/**
 * Route that shows the specific treatment information.
 */
router.get('/:treatment_id', function(req, res) {
    Treatment.findById(req.params.treatment_id, function(err, foundTreatment) {
        if (err) {
            res.redirect('/patients')
        } else {
            console.log('controller ', foundTreatment)
            res.render('treatments/show', { patient_id: req.params.id, diagnose_id: req.params.diagnose_1, treatment: foundTreatment, effects: staticEffects })
        }
    })
})

/**
 * Route directing us to a page to edit the current treatment id.
 * Authorization check is applied.
 * Proper error handling is needed.
 */
router.get('/:treatment_id/edit', middleware.checkTreatmentOwnership, function(req, res) {
    Treatment.findById(req.params.treatment_id, function(err, foundTreatment) {
        Staff.find({ role: 'Νοσηλευτης' }, function(err, findStaff) {
            if (err) {
                res.redirect('/patients')
            } else {
                res.render('treatments/edit', { patient_id: req.params.id, diagnose_id: req.params.diagnose_1, treatment: foundTreatment, staff: findStaff })
            }
        })
    })
})

/**
 * Route that handles the changes from the edit page.
 * Authorization check is applied.
 */
router.put('/:treatment_id', middleware.checkTreatmentOwnership, function(req, res) {
    Treatment.findByIdAndUpdate(req.params.treatment_id, req.body.treatment, function(err, updatedTreatment) {
        if (err) {
            res.redirect('back')
        } else {
            res.redirect('/patients/' + req.params.id + '/diagnoses/' + req.params.diagnose_1 + '/treatments/' + req.params.treatment_id)
        }
    })
})

/**
 * Updates the treatments array of the diagnose removing the id from the array.
 * Deletes a specific treatment based on the id.
 */
router.delete('/:treatment_id', middleware.checkTreatmentOwnership, function(req, res) {
    Diagnose.updateOne({ _id: req.params.diagnose_1 }, { "$pull": { treatments: new ObjectId(req.params.treatment_id) } }, function(err) {
        if (err) {
            console.log(err)
        } else {
            Treatment.findByIdAndRemove(req.params.treatment_id, function(err) {
                if (err) {
                    res.redirect('back')
                } else {
                    res.redirect('/patients/' + req.params.id + '/diagnoses/' + req.params.diagnose_1)
                }
            })
        }
    })

})

module.exports = router