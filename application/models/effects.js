var mongoose = require("mongoose");

var effectsSchema = mongoose.Schema({
    stomach_bowel: {
        baseName: String,
        effects: {
            stomachache: {
                type: Boolean,
                required: true,
                default: false
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
            other: {
                type: String,
                default: '-',
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
            other: {
                type: String,
                default: '-',
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
            itch: {
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
            sensitivityToLight: {
                type: Boolean,
                required: true,
                default: false
            },
            other: {
                type: String,
                default: '-',
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
            other: {
                type: String,
                name: 'Αλλο',
                default: '-',
            },
        },
    },
    eyesight: {
        baseName: String,
        effects: {
            burn_pain: {
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
            itch: {
                type: Boolean,
                required: true,
                default: false
            },
            sensitivityToLight: {
                type: Boolean,
                required: true,
                default: false
            },
            other: {
                type: String,
                default: '-',
            },
        },
    },
    pancreas: {
        baseName: String,
        effects: {
            burn_pain: {
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
            itch: {
                type: Boolean,
                required: true,
                default: false
            },
            sensitivityToLight: {
                type: Boolean,
                required: true,
                default: false
            },
            sensitivityToLight: {
                type: Boolean,
                required: true,
                default: false
            },
            other: {
                type: String,
                default: '-',
            },
        },
    },
    date: { type: Date },
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