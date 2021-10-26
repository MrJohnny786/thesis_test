var express = require("express");
var router = express.Router();
var Effect = require("../models/effects");
var middleware = require('../middleware');
var Treatment = require("../models/treatment");
const treatment = require("../models/treatment");


router.get('/geteffects', (req, res) => {
    console.log(req.params)
    Effect.find({}, (err, effectData) => {
        if (err) {
            res.json({ msg: 'error' });
        } else {
            res.json({ msg: 'success', data: effectData });
        }
    });
});

router.post('/add', (req, res) => {
    // console.log(req.user)

    // var author = {
    //     id: req.user._id,
    //     username: req.user.username,
    //     timeAdded: new Date().toLocaleString()
    // }


    var newEffect = {
        // name: req.body.data.name,
        // surname: req.body.data.surname,
        // role: req.body.data.role,
        // description: req.body.data.description,
        stomach_bowel: {
            baseName: 'Στομαχι/Εντερο',
            effects: {
                stomachache: false,
                cramps: false,
                stomachBurn: false,
                acid_reflux: false,
                indigestion: false,
                nausea: false,
                diarrhea: false,
            },
        },
        lungs: {
            baseName: "Πνευμονες",
            effects: {
                cough1: false,
                cough2: false,
                cough3: false,
                shortOfBreath: false,
            },
        },
        skin: {
            baseName: "Δερμα",
            effects: {
                rash: false,
                itch_skin: false,
                blister: false,
                dryness: false,
                sensitivityToLightSkin: false,
            },
        },
        muscle: {
            baseName: "Μυς/Αρθρωσεις/Νευρα",
            effects: {
                pain_discomfort: false,
                tingle_numb: false,
                muscle_weakness: false,
            },
        },
        eyesight: {
            baseName: "Οραση",
            effects: {
                burn_pain_eye: false,
                red_eyes: false,
                cloudy_eyesight: false,
                discharge: false,
                irritation_eyes: false,
                itch_eye: false,
                sensitivityToLight: false,
            },
        },
        pancreas: {
            baseName: "Ενδοκρινεις αδενες/ Παγκρεας",
            effects: {
                burn_pain: false,
                cloudy_eyesight: false,
                discharge: false,
                itch_p: false,
            },
        },

        // createdAt: { status: Date, default: Date.now },
        // user: author

    };
    var myData = req.body
    console.log(myData)
    for (const [key, value] of Object.entries(myData.data)) {
        for (const [key1, value1] of Object.entries(newEffect)) {
            // console.log(value1)
            if (key in value1.effects) {
                newEffect[key1]['effects'][key] = true
            } else {
                continue;
            }
        }
    }

    Treatment.findById(myData.data.treatment, function(err, treatment) {
        if (err) {
            console.log(err)
            res.json({ msg: 'error' });
        } else {
            Effect.create(newEffect, function(err, effect) {
                // effect.user.id = req.user._id || '5f718d6a515aee44e04261c8'; // both user id and username need middleware check
                // effect.user.username = req.user.username || 'q';
                effect.user.id = '5f718d6a515aee44e04261c8';
                effect.user.username = 'q';
                effect.date = req.body.data.date;
                effect.save();
                treatment.effects.push(effect);
                treatment.save();
                res.json({ msg: 'success' });
            })
        }

    });

});

//Edit Diagnose Route
router.get("/:effect_id/edit", function(req, res) { // add middleware.checkDiagnoseOwnership,
    Effect.findById(req.params.effect_id, function(err, foundDiagnose) {
        Staff.find({ "role": "Γιατρος" }, function(err, findDoctors) {
            if (err) {
                res.redirect("/patients");
            } else {
                res.render("diagnoses/edit", { patient_id: req.params.id, diagnose: foundDiagnose, doctors: findDoctors });
            }
        });
    });
});


// // Update Diagnose Route
// router.put("/:diagnose_id", function(req, res) { // middleware.checkDiagnoseOwnership,
//     Diagnose.findByIdAndUpdate(req.params.diagnose_id, req.body.diagnose, function(err, updatedDiagnose) {
//         if (err) {
//             res.redirect("back");
//             console.log(err)
//         } else {
//             res.redirect("/patients/" + req.params.id + "/diagnoses/" + req.params.diagnose_id);
//         }
//     });
// });


module.exports = router