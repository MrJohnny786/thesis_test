const express = require('express')
const router = express.Router()
const Staff = require('../models/staff')
const middleware = require('../middleware')

/**
 * Route that directs you to the landing page of the staff.
 */
router.get('/', (req, res) => {
  res.render('staff/staff')
})

/**
 * Creates new staff from an Ajax request.
 */
router.post('/addstaff', middleware.isLoggedIn, (req, res) => {
  const author = {
    id: req.user._id,
    username: req.user.username,
    timeAdded: new Date().toLocaleString()
  }
  const newStaff = {
    name: req.body.data.name,
    surname: req.body.data.surname,
    role: req.body.data.role,
    description: req.body.data.description,
    information: author

  }
  Staff.create(newStaff, function (err) {
    if (err) {
      res.json({ msg: 'error' })
    } else {
      res.json({ msg: 'success' })
    }
  })
})

/**
 * Deletes staff based on it's id.
 * Needs authorization middleware.
 */
router.delete('/removestaff', middleware.isLoggedIn, function (req, res) {
  Staff.findByIdAndRemove(req.body.id, function (err) {
    if (err) {
      res.json({ msg: 'error' })
    } else {
      res.json({ msg: 'success' })
    }
  })
})

/**
 * Returns all the staff that exist on the database.
 * Needs authorization middleware.
 */
router.get('/getstaff', (req, res) => {
  Staff.find({}, (err, staffData) => {
    if (err) {
      res.json({ msg: 'error' })
    } else {
      res.json({ msg: 'success', data: staffData })
    }
  })
})

module.exports = router
