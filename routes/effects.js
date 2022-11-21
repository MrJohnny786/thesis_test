const express = require("express");
const router = express.Router();
const Effect = require("../models/effects");
const Treatment = require("../models/treatment");
const ObjectId = require("mongodb").ObjectID;
const Staff = require("../models/staff");
const staticEffects = require("../public/effects.json");

/**
 * Route tha returns all the effects that have been created.
 */
router.get("/geteffects", (req, res) => {
  Effect.find({}, (err, effectData) => {
    if (err) {
      res.json({ msg: "error" });
    } else {
      res.json({ msg: "success", data: effectData });
    }
  });
});

/**
 * Route that sends all the effects that the specific treatment id has.
 */
router.get("/geteffects/:treatment_id", (req, res) => {
  Treatment.findById(req.params.treatment_id, (err, effectData) => {
    if (err) {
      res.json({ msg: "success", data: [] });
    } else {
      const _effects = effectData.effects;
      let effectsArray = [];
      effectsArray = _effects.map((element) => ObjectId(element));
      Effect.find({ _id: { $in: effectsArray } }, function (err, findEffects) {
        if (err) {
          res.redirect("back");
        } else {
          res.json({ msg: "success", data: findEffects });
        }
      });
    }
  });
});

/**
 * Route that creates a new Effect on a specific treatment id.
 * Gets the data from a ajax post request and handles the creation of the new effect.
 * Add proper error handling.
 * ps Change the static saving of the user as author.
 */
router.post("/add", (req, res) => {
  // console.log("req.body", req.body);
  const newEffect = {
    date: null,
    stomach_bowel: {
      baseName: "Στομαχι/Εντερο",
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
        exhaustion: false,
        weight_fluctuation: false,
        tachycardia: false,
        hair_loss: false,
        constipation: false,
        nauseus_fainting: false,
      },
    },
  };
  const myData = req.body;
  newEffect.date = myData.date;

  for (const [key, value] of Object.entries(myData.data)) {
    for (const [key1, value1] of Object.entries(newEffect)) {
      if (typeof value1 === "object" && key in value1.effects) {
        newEffect[key1].effects[key] = true;
      } else {
        continue;
      }
    }
  }

  // SAVE THE CURRENT USER , NOT THE STATIC ONE JESUS CHRIST
  Treatment.findById(myData.data.treatment, function (err, treatment) {
    // console.log("treatment here", treatment);
    if (err) {
      console.log(err);
      res.json({ msg: "error" });
    } else {
      Effect.create(newEffect, function (err, effect) {
        effect.user.id = req.user._id || "5f718d6a515aee44e04261c8"; // both user id and username need middleware check
        effect.user.username = req.user.username || "q";
        // effect.user.id = '5f718d6a515aee44e04261c8'
        // effect.user.username = 'q'
        effect.date = req.body.data.date;
        effect.patient_id = req.body.data.patient;
        effect.diagnose_id = req.body.data.diagnose;
        effect.treatment_id = req.body.data.treatment;

        // console.log(treatment.effects, 'hear')
        effect.save();
        treatment.effects.push(effect);
        treatment.save();
        res.json({ msg: "success", redirect: true, url: "/patients/" });
      });
    }
  });
});

/**
 * Route that completes the editing of the effects of a specific treatment id.
 * Add proper error handling.
 * Add middleware.checkDiagnoseOwnership.
 */
router.get("/:effect_id/edit", function (req, res) {
  // add middleware.checkDiagnoseOwnership,
  Effect.findById(req.params.effect_id, function (err, foundEffect) {
    const keys = [
      "stomach_bowel",
      "lungs",
      "skin",
      "muscle",
      "eyesight",
      "pancreas",
    ];
    onlyEffects = {};
    const source = foundEffect._doc;
    const target = staticEffects;
    keys.forEach(function (element) {
      if (source[element] && target[element]) {
        for (const [key, value] of Object.entries(source[element].effects)) {
          if (value === true) {
            target[element].effects[key].type = true;
          } else {
            target[element].effects[key].type = false;
          }
        }
      } else {
      }
    });
    Staff.find({}, function (err, findDoctors) {
      if (err) {
        res.redirect("/patients");
      } else {
        res.render("effects/edit", {
          effect_id: req.params.id,
          effect: foundEffect,
          doctors: findDoctors,
          effects: target,
        });
      }
    });
  });
});

/**
 * Route that handles the updated effects after the user is done with the editing.
 * Add proper error handling.
 * Add middleware.checkDiagnoseOwnership.
 */
router.put("/:effect_id", function (req, res) {
  // middleware.checkDiagnoseOwnership,
  const newEffect = {
    stomach_bowel: {
      baseName: "Στομαχι/Εντερο",
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
        exhaustion: false,
        weight_fluctuation: false,
        tachycardia: false,
        hair_loss: false,
        constipation: false,
        nauseus_fainting: false,
      },
    },

    // createdAt: { req.body.data.date, default: Date.now },
    // user: author
  };
  const myData = req.body;
  Effect.findById(req.params.effect_id, function (err, foundEffect) {
    newEffect.stomach_bowel = foundEffect.stomach_bowel;
    newEffect.lungs = foundEffect.lungs;
    newEffect.skin = foundEffect.skin;
    newEffect.muscle = foundEffect.muscle;
    newEffect.eyesight = foundEffect.eyesight;
    newEffect.pancreas = foundEffect.pancreas;
    newEffect.date = req.body.data.date;
    for (const [key, value] of Object.entries(myData.data)) {
      for (const [key1, value1] of Object.entries(newEffect)) {
        if (value1 === "object" && key in value1.effects) {
          foundEffect[key1].effects[key] = value;
        } else {
          continue;
        }
      }
    }
    Effect.updateOne(
      { _id: req.params.effect_id },
      newEffect,
      function (err, updatedEffect) {
        if (err) {
          console.log("error", err);
          // res.redirect("back");
        } else {
          console.log("reaches without error");
          res.json({
            msg: "success",
            redirect: true,
            url:
              "/patients/" +
              foundEffect.patient_id +
              "/diagnoses/" +
              foundEffect.diagnose_id +
              "/treatments/" +
              foundEffect.treatment_id,
          });
        }
      }
    );
  });
});

/**
 * Deletes the effects of a specific treatment id.
 */
router.delete("/removeEffect", function (req, res) {
  Effect.findByIdAndRemove(req.body.id, function (err) {
    console.log(err);
    if (err) {
      res.json({ msg: "error" });
    } else {
      res.json({ msg: "success" });
    }
  });
});

router.get("/back", (req, res) => {
  if (err) {
    res.redirect("patients");
  } else {
    res.redirect("back");
  }
});

/**
 * Deleting a diagnose based on the id we have given.
 * Authorization check is applied.
 */
router.delete("/delete/:effect_id", function (req, res) {
  Effect.findByIdAndRemove(req.params.effect_id, function (err) {
    if (err) {
      console.log(err);
      res.redirect("patients");
    } else {
      res.redirect("back");
    }
  });
});

module.exports = router;
