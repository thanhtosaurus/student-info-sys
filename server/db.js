const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl) {
  throw new Error('SUPABASE_URL is not defined in environment variables');
}

if (!supabaseKey) {
  throw new Error('SUPABASE_KEY is not defined in environment variables');
}

// Create client with additional options
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

module.exports = supabase;