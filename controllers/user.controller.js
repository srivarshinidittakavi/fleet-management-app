const supabase = require('../config/supabase')
const { v4 } = require('uuid')

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body

  if (!['customer', 'owner', 'driver'].includes(role))
    return res.status(400).json({ message: 'Invalid role' })

  const { error } = await supabase.from('users').insert([{
    id: v4(),
    name,
    email,
    password,
    role
  }])

  if (error) return res.status(400).json({ message: error.message })

  res.status(201).json({ message: 'User created' })
}

exports.getAllUsers = async (req, res) => {
  const { data, error } = await supabase.from('users').select('*')

  if (error) return res.status(500).json({ message: error.message })

  res.status(200).json(data)
}
