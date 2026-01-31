const express = require('express')
require('dotenv').config()

const logger = require('./middlewares/logger')
const notFound = require('./middlewares/notFound')

const userRoutes = require('./routes/user.routes')
const vehicleRoutes = require('./routes/vehicle.routes')
const tripRoutes = require('./routes/trip.routes')
const analyticsRoutes = require('./routes/analytics.routes')

const app = express()
app.use(express.json())
app.use(logger)

app.use('/users', userRoutes)
app.use('/vehicles', vehicleRoutes)
app.use('/trips', tripRoutes)
app.use('/analytics', analyticsRoutes)

app.use(notFound)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
