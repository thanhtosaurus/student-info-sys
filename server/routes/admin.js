const express = require('express');
const router = express.Router();
const supabase = require('../db');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin operations
 */

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 * 
 * 
 */

/**
 * @swagger
 * /api/admin/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Admin]
 */

/**
 * @swagger
 * /api/admin/createUsers:
 *   post:
 *     summary: Create a new user
 *     tags: [Admin]
 */

router.get('/users', async (req, res) => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
});

router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('users').select('*').eq('user_id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
});

router.post('/createUser', async (req, res) => {
    try {
        const { email, password, username, first_name, last_name, role, department, major_id, grade_level} = req.body;

        // Input validation
        if (!email || !password || !username || !first_name || !last_name) {
            return res.status(400).json({ error: 'Email, password, username, and name are required' });
        }

        // Insert additional user data into users table
        const { data: insertedUser, error: insertError } = await supabase
            .from('users')
            .insert([
                {
                    email: email,
                    username: username,
                    first_name: first_name,
                    last_name: last_name,
                    role: role,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            ])
            .select()
            .single();
            

        // Check if role is professor or student
        if (role === 'professor') {
            // Insert user into professors table
            const { error: insertError } = await supabase
                .from('professors')
                .insert([
                    {
                        professor_id: insertedUser.id,
                        department: department
                    }
                ]);
        } else if (role === 'student') {
            // Insert user into students table
            const { error: insertError } = await supabase
                .from('students')
                .insert([
                    {
                        student_id: insertedUser.id,
                        major_id: major_id,
                        grade_level: grade_level
                    }
                ]);
        }

        if (insertError) {
            // If insert fails, we should clean up the auth user
            console.log(insertError)
            return res.status(500).json({ error: 'Failed to create user profile' });
        }

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: insertedUser.id,
                email: insertedUser.email,
                username: insertedUser.username,
                first_name: insertedUser.first_name,
                last_name: insertedUser.last_name,
                role: insertedUser.role
            }
        });

    } catch (err) {
        console.error('Signup error:', err.message);
        res.status(500).json({ error: 'Signup error' });
    }
});

router.put('/updateProfessor/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body;

        // Input validation
        if (!userData || Object.keys(userData).length === 0) {
            return res.status(400).json({ error: 'No data provided for update' });
        }

        // Update the record in Supabase
        const { data, error } = await supabase
            .from('professors')
            .update(userData)
            .eq('professor_id', id)
            .select();

        if (error) {
            console.error('Supabase professor update error:', error);
            return res.status(500).json({ error: 'Failed to update professor data' });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Professor not found' });
        }

        // Return the updated data
        return res.status(200).json({
            message: 'Professor updated successfully',
            data: data[0]
        });

    } catch (err) {
        console.error('Professor update error:', err.message);
        res.status(500).json({ error: 'Professor update error' });
    }
});

module.exports = router;