var mongoose = require("mongoose");
var Staff = require("./models/staff")
const { uniqueNamesGenerator, Config, starWars, names, adjectives, colors, animals } = require('unique-names-generator');

const role = [
    'Γιατρος',
    'Νοσηλευτης',
    'Αλλο'
];

const config_name = {
    dictionaries: [names]
}
const config_surname = {
    dictionaries: [starWars]
}

const config_role = {
    dictionaries: [role]
}

const config_description = {
    dictionaries: [animals]
}

var name = uniqueNamesGenerator(config_name);
var surname = uniqueNamesGenerator(config_surname);
var role_gen = uniqueNamesGenerator(config_role);
var description = uniqueNamesGenerator(config_description);

var data = [{
    name: name,
    surname: surname,
    role: role_gen,
    description: description
}]

function delete_all() {
    //Remove all campgrounds
    Staff.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("removed Staff!");
        //add a few campgrounds

    });
    //add a few comments
}

function seedDB() {
    data.forEach(function(seed) {
        Staff.create(seed, function(err, staff) {
            if (err) {
                console.log(err)
            } else {
                console.log("added Staff");
            }
        });
    });
}
module.exports = seedDB;