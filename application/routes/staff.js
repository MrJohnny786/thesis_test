var express = require("express");
var router = express.Router();
var Staff = require("../models/staff");
var middleware = require('../middleware');


router.get('/', (req, res) => {
    res.render('staff/staff');
});

router.post('/addstaff', (req, res) => {
    console.log(req.user)
    var author = {
        id: req.user._id,
        username: req.user.username,
        timeAdded: new Date().toLocaleString()
    }
    var newStaff = {
        name: req.body.data.name,
        surname: req.body.data.surname,
        role: req.body.data.role,
        description: req.body.data.description,
        information: author

    };
    Staff.create(newStaff, function(err) {
        if (err) {
            res.json({ msg: 'error' });
        } else {
            res.json({ msg: 'success' });
        }
    });
});

//Destroy Patient
router.delete("/removestaff", function(req, res) {
    Staff.findByIdAndRemove(req.body.id, function(err) {
        if (err) {
            res.json({ msg: 'error' });
        } else {
            res.json({ msg: 'success' });
        }
    });
});


router.get('/getstaff', (req, res) => {

    Staff.find({}, (err, staffData) => {
        // console.log(staffData)
        if (err) {
            res.json({ msg: 'error' });
        } else {
            res.json({ msg: 'success', data: staffData });
        }
    });
});

module.exports = router