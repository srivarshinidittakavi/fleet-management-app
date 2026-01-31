const supabase = require('../config/supabase')

exports.getAllUsers = async (req, res) => {
  const { data, error } = await supabase.from('users').select('*')
  
  if (error) return res.status(500).json({ message: error.message })
  
  res.status(200).json(data)
}
