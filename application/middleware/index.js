var Patient = require("../models/patient");
var Diagnose = require("../models/diagnose");
var Treatment = require("../models/treatment");

// New object to add Ownership functions.
var middlewareObj = {};

/**
 * Checks Ownership of the Patient.
 * First checks if the user is authenticated.
 * Afterwards it checks if the user created the Patient information or if he is a super user.
 * Otherwise it returns a proper response.
 */
middlewareObj.checkPatientOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Patient.findById(req.params.id, function(err, foundPatient) {
            if (err) {
                req.flash("error", "Δημιουργηθηκε καποιο προβλημα")
                res.redirect("/patients");
            } else {
                if (foundPatient.author.id.equals(req.user._id) || req.user.isAdmin) {
                    next();
                } else {
                    req.flash("error", "Δεν εχεις την απαραιτητη εξουσιοδοτηση!")
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Πρεπει να εισαι συνδεδεμενος!")
        res.redirect("back");
    }
}

/**
 * Checks Ownership of the Diagnose.
 * First checks if the user is authenticated.
 * Afterwards it checks if the user created the Diagnose information or if he is a super user.
 * Otherwise it returns a proper response.
 */
middlewareObj.checkDiagnoseOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Diagnose.findById(req.params.diagnose_id, function(err, foundDiagnose) {
            if (err) {
                res.redirect("back");
            } else {
                if (foundDiagnose.alpha.id.equals(req.user._id) || req.user.isAdmin) {
                    next();
                } else {
                    req.flash("error", "Δεν εχεις την απαραιτητη εξουσιοδοτηση!")
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Πρεπει να εισαι συνδεδεμενος για να κανεις αυτην την ενεργεια!")
        res.redirect("back");
    }
}

/**
 * Checks Ownership of the Treatment.
 * First checks if the user is authenticated.
 * Afterwards it checks if the user created the Treatment information or if he is a super user.
 * Otherwise it returns a proper response.
 */
middlewareObj.checkTreatmentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Treatment.findById(req.params.treatment_id, function(err, foundTreatment) {
            if (err) {
                res.redirect("back");
            } else {
                // does user own the treatment?
                if (foundTreatment.beta.id.equals(req.user._id) || req.user.isAdmin) {
                    next();
                } else {
                    req.flash("error", "Δεν εχεις την απαραιτητη εξουσιοδοτηση!")
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Πρεπει να εισαι συνδεδεμενος για να κανεις αυτην την ενεργεια!")
        res.redirect("back");
    }
}

/**
 * Check if the user is logged in to do a curtain action
 */
middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Πρεπει να εισαι συνδεδεμενος για να κανεις αυτην την ενεργεια!")
    res.redirect("/");
}






module.exports = middlewareObj;