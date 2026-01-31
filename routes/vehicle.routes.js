const express = require('express')
const router = express.Router()
const limiter = require('../middlewares/rateLimiter')
const { addVehicle, assignDriver, getVehicle } = require('../controllers/vehicle.controller')

router.post('/', createVehicle)
router.get('/', getAllVehicles)
router.get('/:id', getVehicleById)
router.put('/:id/assign-driver', assignDriver)
router.put('/:id', updateVehicle)
router.delete('/:id', deleteVehicle)


module.exports = router
