const supabase = require('../config/supabase')
const { v4 } = require('uuid')

exports.createTrip = async (req, res) => {
  const { customer_id, vehicle_id, start_date, end_date, location, distance_km, passengers } = req.body

  const vehicle = await supabase.from('vehicles').select('*').eq('id', vehicle_id).single()

  if (!vehicle.data || !vehicle.data.isAvailable)
    return res.status(400).json({ message: 'Vehicle not available' })

  if (passengers > vehicle.data.allowed_passengers)
    return res.status(400).json({ message: 'Passengers exceed limit' })

  await supabase.from('trips').insert([{
    id: v4(),
    customer_id,
    vehicle_id,
    start_date,
    end_date,
    location,
    distance_km,
    passengers,
    tripCost: 0
  }])

  await supabase.from('vehicles').update({ isAvailable: false }).eq('id', vehicle_id)

  res.status(201).json({ message: 'Trip created' })
}

exports.getTrip = async (req, res) => {
  const trip = await supabase.from('trips').select('*').eq('id', req.params.tripId).single()
  res.json(trip.data)
}

exports.updateTrip = async (req, res) => {
  await supabase.from('trips').update(req.body).eq('id', req.params.tripId)
  res.json({ message: 'Trip updated' })
}

exports.deleteTrip = async (req, res) => {
  await supabase.from('trips').delete().eq('id', req.params.tripId)
  res.json({ message: 'Trip deleted' })
}

exports.endTrip = async (req, res) => {
  const trip = await supabase.from('trips').select('*').eq('id', req.params.tripId).single()
  const vehicle = await supabase.from('vehicles').select('*').eq('id', trip.data.vehicle_id).single()

  const cost = trip.data.distance_km * vehicle.data.rate_per_km

  await supabase.from('trips').update({
    isCompleted: true,
    tripCost: cost
  }).eq('id', req.params.tripId)

  await supabase.from('vehicles').update({ isAvailable: true }).eq('id', vehicle.data.id)

  res.json({ message: 'Trip ended', tripCost: cost })
}
