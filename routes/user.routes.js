const express = require('express')
const router = express.Router()
const { signup, getAllUsers } = require('../controllers/user.controller')

router.post('/signup', signup)
router.get('/', getAllUsers)

exports.getAllUsers = async (req, res) => {
    const { data, error } = await supabase.from('users').select('*')
    if (error) return res.status(400).json({ message: error.message })
    res.status(200).json(data)
  }
  
