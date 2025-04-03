const express = require('express');
const router = express.Router();
const supabase = require('../db');

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *       401:
 *         description: Invalid credentials
 *       400:
 *         description: Missing required fields
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated user ID
 *         email:
 *           type: string
 *           format: email
 *           description: User's email
 *         name:
 *           type: string
 *           description: User's full name
 *         role:
 *           type: string
 *           description: User's role
 *           enum: [user, admin]
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *               name:
 *                 type: string
 *                 description: User's full name
 *               role:
 *                 type: string
 *                 description: User's role
 *                 enum: [user, admin]
 *                 default: user
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Missing required fields
 *       409:
 *         description: User already exists
 *       500:
 *         description: Server error
 */

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Sign in with Supabase Auth
    const { data: { session }, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({
      token: session.access_token,
      user: session.user
    });

  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name, role = 'user' } = req.body;

    // Input validation
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role
        }
      }
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        return res.status(409).json({ error: 'User already exists' });
      }
      return res.status(500).json({ error: authError.message });
    }

    // Insert additional user data into users table and get the inserted row
    const { data: insertedUser, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user.id,
          email: authData.user.email,
          name: name,
          role: role,
          created_at: new Date().toISOString()
        }
      ])
      .select() // This will return the inserted row
      .single(); // Get a single row instead of an array

    if (insertError) {
      // If insert fails, we should clean up the auth user
      await supabase.auth.admin.deleteUser(authData.user.id);
      return res.status(500).json({ error: 'Failed to create user profile' });
    }

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: insertedUser.id, // This is the table row ID
        auth_id: authData.user.id, // This is the auth user ID
        email: insertedUser.email,
        name: insertedUser.name,
        role: insertedUser.role,
        created_at: insertedUser.created_at
      }
    });

  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
