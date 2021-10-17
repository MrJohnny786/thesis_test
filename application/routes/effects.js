var express = require("express");
var router = express.Router();
var Effect = require("../models/effects");
var middleware = require('../middleware');


router.get('/geteffects', (req, res) => {
    Effect.find({}, (err, effectData) => {
        if (err) {
            res.json({ msg: 'error' });
        } else {
            res.json({ msg: 'success', data: effectData });
        }
    });
});

router.post('/add', (req, res) => {
    
    // var author = {
    //     id: req.user._id,
    //     username: req.user.username,
    //     timeAdded: new Date().toLocaleString()
    // }
    // console.log(req)
    // res.send('XD')

    var newEffect = {
        // name: req.body.data.name,
        // surname: req.body.data.surname,
        // role: req.body.data.role,
        // description: req.body.data.description,
        stomach_bowel: {
            baseName: 'Στομαχι/Εντερο',
            effects: {
                stomachache: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                cramps: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                stomachBurn: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                acid_reflux: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                indigestion: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                nausea: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                diarrhea: {
                    status: Boolean,
                    required: true,
                    default: false
                },
            },
        },
        lungs: {
            baseName: "Πνευμονες",
            effects: {
                cough1: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                cough2: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                cough3: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                shortOfBreath: {
                    status: Boolean,
                    required: true,
                    default: false
                },
            },
        },
        skin: {
            baseName: "Δερμα",
            effects: {
                rash: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                itch: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                blister: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                dryness: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                sensitivityToLight: {
                    status: Boolean,
                    required: true,
                    default: false
                },
            },
        },
        muscle: {
            baseName: "Μυς/Αρθρωσεις/Νευρα",
            effects: {
                pain_discomfort: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                tingle_numb: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                muscle_weakness: {
                    status: Boolean,
                    required: true,
                    default: false
                },
            },
        },
        eyesight: {
            baseName: "Οραση",
            effects: {
                burn_pain: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                red_eyes: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                cloudy_eyesight: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                discharge: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                irritation_eyes: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                itch: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                sensitivityToLight: {
                    status: Boolean,
                    required: true,
                    default: false
                },
            },
        },
        pancreas: {
            baseName: "Ενδοκρινεις αδενες/ Παγκρεας",
            effects: {
                burn_pain: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                red_eyes: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                cloudy_eyesight: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                discharge: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                irritation_eyes: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                itch: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                sensitivityToLight: {
                    status: Boolean,
                    required: true,
                    default: false
                },
                sensitivityToLight: {
                    status: Boolean,
                    required: true,
                    default: false
                },
            },
        },
        // date: { status: Date },
        // createdAt: { status: Date, default: Date.now },
        // user: author
        
    };
    var myData = req.body
    //console.log(req.body)
    for (const [key, value] of Object.entries(myData.data)) {
        // console.log(key)
        for (const [key1, value1] of Object.entries(newEffect)) {
            //console.log(key, key1)
            // if (key in newEffect.key1.effects){
            if (newEffect[key1]){
                console.log(newEffect.key1)
            }else{
                continue;
            }
        }
    }



    // for (const [key, value] of Object.entries(myData.data)) {
    //     for (const [key1, value1] of Object.entries(newEffect)) {
    //         //console.log(key1, value1, '1')
    //         for (const [key2, value2] of Object.entries(value1.effects)) {
    //             console.log(key , key2)
    //             if (value == key2){
    //                 //console.log(value)
    //                 newEffect.key1.effects.key2.status =true
    //             }
    //         }
    //     }
    // }
    // console.log(newEffect.stomach_bowel.effects.stomachache.status)
    // Effect.create(newEffect, function(err) {
    //     if (err) {
    //         res.json({ msg: 'error' });
    //     } else {
    //         res.json({ msg: 'success' });
    //     }
    // });
});


module.exports = router