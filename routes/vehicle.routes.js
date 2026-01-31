const express = require('express')
const router = express.Router()
const limiter = require('../middlewares/rateLimiter')
const { addVehicle, assignDriver, getVehicle } = require('../controllers/vehicle.controller')

router.post('/add', limiter, addVehicle)
router.patch('/assign-driver/:vehicleId', assignDriver)
router.get('/:vehicleId', getVehicle)

module.exports = router
