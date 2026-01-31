const express = require('express')
require('dotenv').config()
const supabase = require('./config/supabase')

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
}

const notFound = (req, res) => {
  res.status(404).json({ error: 'Route not found' })
}


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

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
