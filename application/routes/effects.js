var express = require("express");
var router = express.Router();
var Effect = require("../models/effects");
var middleware = require('../middleware');
var Treatment = require("../models/treatment");
const treatment = require("../models/treatment");
var ObjectId = require('mongodb').ObjectID;
var Staff = require("../models/staff");
const staticEffects = require("../public/effects.json")


// const mongoose = require('mongoose');

// console.log(mongoose.Types.ObjectId.isValid('53cb6b9b4f4ddef1ad47f943'));
// // true
// console.log(mongoose.Types.ObjectId.isValid('whatever'));
// // false


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

router.get('/geteffects/:treatment_id', (req, res) => {
    // console.log(req.params)
    Treatment.findById(req.params.treatment_id, (err, effectData) => {
        if (err) {
            // console.log(effectData, 'XDDDDDDDDDDD')
            res.json({ msg: 'success', data: [] });
        } else {
            var _effects = effectData.effects
            var effectsArray = []
            effectsArray = _effects.map(element => ObjectId(element))
            Effect.find({ "_id": { "$in": effectsArray } }, function(err, findEffects) {
                    if (err) {
                        res.redirect("back");
                    } else {
                        res.json({ msg: 'success', data: findEffects });
                    }
                })
                // console.log(_data)
                // db.getCollection('feed').find({"_id" : {"$in" : [ObjectId("55880c251df42d0466919268"), ObjectId("55bf528e69b70ae79be35006")]}});

            // console.log(_data)
            // res.json({ msg: 'success', data: _data });
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
                headache_p: false,
                exhastion: false,
                weight_fluctuation: false,
                tachycardia: false,
                hair_loss: false,
                constipation: false,
                nauseus_fainting: false,
            },
        },

        // createdAt: { status: Date, default: Date.now },
        // user: author

    };
    var myData = req.body
    for (const [key, value] of Object.entries(myData.data)) {
        for (const [key1, value1] of Object.entries(newEffect)) {
            if (key in value1.effects) {
                newEffect[key1]['effects'][key] = true
            } else {
                continue;
            }
        }
    }

    // SAVE THE CURRENT USER , NOT THE STATIC ONE JESUS CHRIST
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
                effect.patient_id = req.body.data.patient
                effect.diagnose_id = req.body.data.diagnose
                effect.treatment_id = req.body.data.treatment
                    // console.log(req.body.data, 'hear')
                effect.save();
                treatment.effects.push(effect);
                treatment.save();
                res.json({ msg: 'success' });
            })
        }

    });

});

// Edit Effect Route
router.get("/:effect_id/edit", function(req, res) { // add middleware.checkDiagnoseOwnership,
    Effect.findById(req.params.effect_id, function(err, foundEffect) {
        var keys = ['stomach_bowel', 'lungs', 'skin', 'muscle', 'eyesight', 'pancreas']
        onlyEffects = {}
        var source = foundEffect._doc
        var target = staticEffects


        keys.forEach(function(element) {
            if (source[element] && target[element]) {
                for (const [key, value] of Object.entries(source[element].effects)) {
                    if (value === true) {
                        target[element]['effects'][key]['type'] = true
                    } else {
                        target[element]['effects'][key]['type'] = false
                    }
                }
            } else {
                return;
            }
        })

        Staff.find({}, function(err, findDoctors) {
            if (err) {
                res.redirect("/patients");
            } else {
                res.render("effects/edit", { effect_id: req.params.id, effect: foundEffect, doctors: findDoctors, effects: target });
            }
        });
    });
});


// Update Effect Route
router.put("/:effect_id", function(req, res) { // middleware.checkDiagnoseOwnership,
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
                headache_p: false,
                exhastion: false,
                weight_fluctuation: false,
                tachycardia: false,
                hair_loss: false,
                constipation: false,
                nauseus_fainting: false,
            },
        },

        // createdAt: { status: Date, default: Date.now },
        // user: author

    };
    var myData = req.body


    Effect.findById(req.params.effect_id, function(err, foundEffect) {
        newEffect['stomach_bowel'] = foundEffect['stomach_bowel']
        newEffect['lungs'] = foundEffect['lungs']
        newEffect['skin'] = foundEffect['skin']
        newEffect['muscle'] = foundEffect['muscle']
        newEffect['eyesight'] = foundEffect['eyesight']
        newEffect['pancreas'] = foundEffect['pancreas']
        for (const [key, value] of Object.entries(myData.data)) {
            for (const [key1, value1] of Object.entries(newEffect)) {
                if (key in value1.effects) {
                    foundEffect[key1]['effects'][key] = value
                } else {
                    continue;
                }
            }
        }
        Effect.updateOne({ "_id": req.params.effect_id }, newEffect, function(err, updatedEffect) {
            if (err) {
                console.log('error', err)
                res.redirect("back");
                // console.log(err)
            } else {
                console.log(foundEffect.patient_id)
                    // res.redirect("back");
                res.json({ msg: 'success', redirect: true, url: "/patients/" + foundEffect.patient_id + "/diagnoses/" + foundEffect.diagnose_id + "/treatments/" + foundEffect.treatment_id });

                // res.redirect("/patients/" + foundEffect.patient_id + "/diagnoses/" + foundEffect.diagnose_id + "/treatments/" + foundEffect.treatment_id);
            }
        })

    })


});


//Destroy Patient 617ea483b9a9a933a8c9b0ed
router.delete("/removeEffect", function(req, res) {
    console.log(req.body.id)
    Effect.findByIdAndRemove(req.body.id, function(err) {
        console.log(err)
        if (err) {
            res.json({ msg: 'error' });
        } else {
            res.json({ msg: 'success' });
        }
    });
});


module.exports = router