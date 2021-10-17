// var effects = require('../effects.json')
// console.log(effects)
// // const obj = JSON.parse(effects)
// // console.log(obj)

const effectsData = {
    "stomach_bowel": {
        "baseName": "Στομαχι/Εντερο",
        "effects": {
            "stomachache": {
                "type": "Boolean",
                "name": "Πονο στο στομαχι",
                "required": true,
                "default": false
            },
            "cramps": {
                "type": "Boolean",
                "name": "Κραμπες",
                "required": true,
                "default": false
            },
            "stomachBurn": {
                "type": "Boolean",
                "name": "Καψιμο στο στομαχι",
                "required": true,
                "default": false
            },
            "acid_reflux": {
                "type": "Boolean",
                "name": "Καουρες",
                "required": true,
                "default": false
            },
            "indigestion": {
                "type": "Boolean",
                "name": "Δυσπεψία",
                "required": true,
                "default": false
            },
            "nausea": {
                "type": "Boolean",
                "name": "Ναυτια",
                "required": true,
                "default": false
            },
            "diarrhea": {
                "type": "Boolean",
                "name": "Διαρροια",
                "required": true,
                "default": false
            },
            "other": {
                "type": "String",
                "name": "Αλλο",
                "default": "-"
            }
        }
    },
    "lungs": {
        "baseName": "Πνευμονες",
        "effects": {
            "cough1": {
                "type": "Boolean",
                "name": "Βηχα με η χωρις φλεματα",
                "required": true,
                "default": false
            },
            "cough2": {
                "type": "Boolean",
                "name": "Βηχα διαφορετικο απο οτι συνηθως",
                "required": true,
                "default": false
            },
            "cough3": {
                "type": "Boolean",
                "name": "Βηχα με η χωρις πυρετο",
                "required": true,
                "default": false
            },
            "shortOfBreath": {
                "type": "Boolean",
                "name": "Δύσπνοια",
                "required": true,
                "default": false
            },
            "other": {
                "type": "String",
                "name": "Αλλο",
                "default": "-"
            }
        }
    },
    "skin": {
        "baseName": "Δερμα",
        "effects": {
            "rash": {
                "type": "Boolean",
                "name": "Εξανθηματα",
                "required": true,
                "default": false
            },
            "itch": {
                "type": "Boolean",
                "name": "Φαγούρα",
                "required": true,
                "default": false
            },
            "blister": {
                "type": "Boolean",
                "name": "Φουσκάλες",
                "required": true,
                "default": false
            },
            "dryness": {
                "type": "Boolean",
                "name": "Ξηρότητα",
                "required": true,
                "default": false
            },
            "sensitivityToLight": {
                "type": "Boolean",
                "name": "Ευαισθησια στο ηλιακο φως",
                "required": true,
                "default": false
            },
            "other": {
                "type": "String",
                "name": "Αλλο",
                "default": "-"
            }
        }
    },
    "muscle": {
        "baseName": "Μυς/Αρθρωσεις/Νευρα",
        "effects": {
            "pain_discomfort": {
                "type": "Boolean",
                "name": "Πονους και ενοχλησεις",
                "required": true,
                "default": false
            },
            "tingle_numb": {
                "type": "Boolean",
                "name": "Μουδιασμα η μυρμιγκιασμα στα ακρα",
                "required": true,
                "default": false
            },
            "muscle_weakness": {
                "type": "Boolean",
                "name": "Σoβαρη μυικη αδυναμια/εξαντληση",
                "required": true,
                "default": false
            },
            "other": {
                "type": "String",
                "name": "Αλλο",
                "default": "-"
            }
        }
    },
    "eyesight": {
        "baseName": "Οραση",
        "effects": {
            "burn_pain": {
                "type": "Boolean",
                "name": "Καψιμο/πονο",
                "required": true,
                "default": false
            },
            "red_eyes": {
                "type": "Boolean",
                "name": "Κοκκινισμα στα ματια",
                "required": true,
                "default": false
            },
            "cloudy_eyesight": {
                "type": "Boolean",
                "name": "Θολεροτητα στην οραση",
                "required": true,
                "default": false
            },
            "discharge": {
                "type": "Boolean",
                "name": "Εκκρισεις",
                "required": true,
                "default": false
            },
            "irritation_eyes": {
                "type": "Boolean",
                "name": "Ερεθισμο στα ματια",
                "required": true,
                "default": false
            },
            "itch": {
                "type": "Boolean",
                "name": "Κνησμο",
                "required": true,
                "default": false
            },
            "sensitivityToLight": {
                "type": "Boolean",
                "name": "Ευαισθησια στο φως",
                "required": true,
                "default": false
            },
            "other": {
                "type": "String",
                "name": "Αλλο",
                "default": "-"
            }
        }
    },
    "pancreas": {
        "baseName": "Ενδοκρινεις αδενες/ Παγκρεας",
        "effects": {
            "burn_pain": {
                "type": "Boolean",
                "name": "Επιμονη/Ασυνηθιστη κεφαλαλγια",
                "required": true,
                "default": false
            },
            "red_eyes": {
                "type": "Boolean",
                "name": "Υπερβολικη κοπωση",
                "required": true,
                "default": false
            },
            "cloudy_eyesight": {
                "type": "Boolean",
                "name": "Αυξηση/απωλεια βαρους",
                "required": true,
                "default": false
            },
            "discharge": {
                "type": "Boolean",
                "name": "Ταχυκαρδια",
                "required": true,
                "default": false
            },
            "irritation_eyes": {
                "type": "Boolean",
                "name": "Αυξημενη εφιδρωση",
                "required": true,
                "default": false
            },
            "itch": {
                "type": "Boolean",
                "name": "Απωλεια μαλλιων",
                "required": true,
                "default": false
            },
            "sensitivityToLight": {
                "type": "Boolean",
                "name": "Ναυτια / λιποθυμικη ταση",
                "required": true,
                "default": false
            },
            "other": {
                "type": "String",
                "name": "Αλλο",
                "default": "-"
            }
        }
    }
}

module.exports = effectsData;