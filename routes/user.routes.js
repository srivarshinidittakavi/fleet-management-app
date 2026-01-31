const express = require('express')
const router = express.Router()
const { getAllUsers, signupUser } = require('../controllers/user.controller')

router.post('/signup', signupUser)
router.get('/', getAllUsers)

module.exports = router
