const supabase = require('../config/supabase')
const { v4 } = require('uuid')

exports.addVehicle = async (req, res) => {
  const { name, registration_number, allowed_passengers, rate_per_km, owner_id } = req.body

  const owner = await supabase.from('users').select('role').eq('id', owner_id).single()
  if (!owner.data || owner.data.role !== 'owner')
    return res.status(403).json({ message: 'Only owner can add vehicle' })

  const { error } = await supabase.from('vehicles').insert([{
    id: v4(),
    name,
    registration_number,
    allowed_passengers,
    rate_per_km,
    owner_id
  }])

  if (error)
    return res.status(400).json({ message: error.message })

  res.status(201).json({ message: 'Vehicle added' })
}

exports.assignDriver = async (req, res) => {
  const { driver_id } = req.body
  const { vehicleId } = req.params

  const driver = await supabase.from('users').select('role').eq('id', driver_id).single()
  if (!driver.data || driver.data.role !== 'driver')
    return res.status(400).json({ message: 'Invalid driver' })

  await supabase.from('vehicles').update({ driver_id }).eq('id', vehicleId)

  res.json({ message: 'Driver assigned' })
}

exports.getVehicle = async (req, res) => {
  const { vehicleId } = req.params
  const vehicle = await supabase.from('vehicles').select('*').eq('id', vehicleId).single()
  res.json(vehicle.data)
}
