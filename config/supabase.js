const path = require('path')
const { createClient } = require('@supabase/supabase-js')

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

console.log('SUPABASE_URL:', process.env.SUPABASE_URL)
console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY ? 'Exists' : 'Missing')

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    throw new Error('SUPABASE_URL or SUPABASE_KEY is missing in .env')
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

module.exports = supabase
