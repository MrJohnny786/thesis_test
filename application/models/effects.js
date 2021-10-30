var mongoose = require("mongoose");

var effectsSchema = new mongoose.Schema({
    stomach_bowel: {
        baseName: String,
        effects: {
            stomachache: {
                type: Boolean,
                required: true,
                default: false,
            },
            cramps: {
                type: Boolean,
                required: true,
                default: false
            },
            stomachBurn: {
                type: Boolean,
                required: true,
                default: false
            },
            acid_reflux: {
                type: Boolean,
                required: true,
                default: false
            },
            indigestion: {
                type: Boolean,
                required: true,
                default: false
            },
            nausea: {
                type: Boolean,
                required: true,
                default: false
            },
            diarrhea: {
                type: Boolean,
                required: true,
                default: false
            },
        },
    },
    lungs: {
        baseName: String,
        effects: {
            cough1: {
                type: Boolean,
                required: true,
                default: false
            },
            cough2: {
                type: Boolean,
                required: true,
                default: false
            },
            cough3: {
                type: Boolean,
                required: true,
                default: false
            },
            shortOfBreath: {
                type: Boolean,
                required: true,
                default: false
            },
        },
    },
    skin: {
        baseName: String,
        effects: {
            rash: {
                type: Boolean,
                required: true,
                default: false
            },
            itch_skin: {
                type: Boolean,
                required: true,
                default: false
            },
            blister: {
                type: Boolean,
                required: true,
                default: false
            },
            dryness: {
                type: Boolean,
                required: true,
                default: false
            },
            sensitivityToLightSkin: {
                type: Boolean,
                required: true,
                default: false
            },
        },
    },
    muscle: {
        baseName: String,
        effects: {
            pain_discomfort: {
                type: Boolean,
                required: true,
                default: false
            },
            tingle_numb: {
                type: Boolean,
                required: true,
                default: false
            },
            muscle_weakness: {
                type: Boolean,
                required: true,
                default: false
            },
        },
    },
    eyesight: {
        baseName: String,
        effects: {
            burn_pain_eye: {
                type: Boolean,
                required: true,
                default: false
            },
            red_eyes: {
                type: Boolean,
                required: true,
                default: false
            },
            cloudy_eyesight: {
                type: Boolean,
                required: true,
                default: false
            },
            discharge: {
                type: Boolean,
                required: true,
                default: false
            },
            irritation_eyes: {
                type: Boolean,
                required: true,
                default: false
            },
            itch_eye: {
                type: Boolean,
                required: true,
                default: false
            },
            sensitivityToLight: {
                type: Boolean,
                required: true,
                default: false
            },
        },
    },
    pancreas: {
        baseName: String,
        effects: {
            headache_p: {
                type: Boolean,
                required: true,
                default: false
            },
            exhastion: {
                type: Boolean,
                required: true,
                default: false
            },
            weight_fluctuation: {
                type: Boolean,
                required: true,
                default: false
            },
            tachycardia: {
                type: Boolean,
                required: true,
                default: false
            },
            hair_loss: {
                type: Boolean,
                required: true,
                default: false
            },
            constipation: {
                type: Boolean,
                required: true,
                default: false
            },
            nauseus_fainting: {
                type: Boolean,
                required: true,
                default: false
            }
        },
    },
    date: { type: Date },
    patient_id: String,
    diagnose_id: String,
    treatment_id: String,
    createdAt: { type: Date, default: Date.now },
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },

});

module.exports = mongoose.model("Effect", effectsSchema);