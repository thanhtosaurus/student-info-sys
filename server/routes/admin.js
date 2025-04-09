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
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     description: Fetches all user records from the database
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The user ID
 *                   # Add other expected user properties here, for example:
 *                   name:
 *                     type: string
 *                     description: The user's name
 *                   email:
 *                     type: string
 *                     description: The user's email
 *                   # ...other properties
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieves detailed information for a specific user based on their user_id
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: string
 *                     description: The unique identifier for the user
 *                   # Add other expected user properties here
 *       500:
 *         description: Server error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /createUser:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user with the provided information. If the role is professor or student, additional information is stored in the respective table.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - username
 *               - first_name
 *               - last_name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *               username:
 *                 type: string
 *                 description: User's chosen username
 *               first_name:
 *                 type: string
 *                 description: User's first name
 *               last_name:
 *                 type: string
 *                 description: User's last name
 *               role:
 *                 type: string
 *                 description: User's role (e.g., 'professor', 'student')
 *                 enum: [professor, student]
 *               department:
 *                 type: string
 *                 description: Department name (required if role is 'professor')
 *               major_id:
 *                 type: integer
 *                 description: ID of the user's major (required if role is 'student')
 *               grade_level:
 *                 type: string
 *                 description: Student's grade level (required if role is 'student')
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       description: Unique user ID
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: User's email
 *                     username:
 *                       type: string
 *                       description: User's username
 *                     first_name:
 *                       type: string
 *                       description: User's first name
 *                     last_name:
 *                       type: string
 *                       description: User's last name
 *                     role:
 *                       type: string
 *                       description: User's role
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email, password, username, and name are required
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to create user profile
 */

/**
 * @swagger
 * /updateProfessor/{id}:
 *   put:
 *     summary: Update professor information
 *     description: Updates the data for a professor with the specified ID
 *     tags:
 *       - Professors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The professor's unique identifier
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Professor data to update
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The professor's name
 *               email:
 *                 type: string
 *                 description: The professor's email address
 *               department:
 *                 type: string
 *                 description: The professor's department
 *               title:
 *                 type: string
 *                 description: The professor's title
 *             example:
 *               name: "Dr. Jane Smith"
 *               email: "jane.smith@university.edu"
 *               department: "Computer Science"
 *               title: "Associate Professor"
 *     responses:
 *       200:
 *         description: Professor updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Professor updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     professor_id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     department:
 *                       type: string
 *                     title:
 *                       type: string
 *       400:
 *         description: No data provided for update
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No data provided for update"
 *       404:
 *         description: Professor not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Professor not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Professor update error"
 */



/**
 * @swagger
 * /api/admin/checkUsername/{username}:
 *   get:
 *     summary: Check if a username exists
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Username availability status
=======
/**
 * @swagger
 * /catalogs/{catalog_year}:
 *   get:
 *     summary: Retrieve sections by catalog year
 *     description: Fetches all sections and their related semester and course information for a specific catalog year
 *     tags:
 *       - Catalogs
 *     parameters:
 *       - in: path
 *         name: catalog_year
 *         required: true
 *         schema:
 *           type: string
 *         description: The catalog year to retrieve sections for
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The section ID
 *                   semesters:
 *                     type: object
 *                     description: Information about the semester
 *                   courses:
 *                     type: object
 *                     description: Information about the course
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /createCatalog:
 *   post:
 *     summary: Create a new catalog
 *     description: Creates a new catalog entry with the specified catalog year
 *     tags:
 *       - Catalogs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - catalog_year
 *             properties:
 *               catalog_year:
 *                 type: string
 *                 description: The year of the catalog (e.g., "2023")
 *                 example: "2023"
 *     responses:
 *       201:
 *         description: Catalog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Catalog created successfully
 *                 catalog:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: 123e4567-e89b-12d3-a456-426614174000
 *                     catalog_year:
 *                       type: string
 *                       example: "2023"
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Catalog year is required
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to create catalog

 */


router.get('/users', async (req, res) => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
});


router.get('/checkUsername/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const { data, error } = await supabase
            .from('users')
            .select('username')
            .eq('username', username)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
            return res.status(500).json({ error: error.message });
        }

        res.status(200).json({ exists: !!data });
    } catch (err) {
        console.error('Username check error:', err.message);
        res.status(500).json({ error: 'Failed to check username' });
    }
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

// ===== Catalog ===== //

// Create catalog
router.post('/createCatalog', async (req, res) => {
    try {
        const { catalog_year } = req.body;

        // Input validation
        if (!catalog_year) {
            return res.status(400).json({ error: 'Catalog year is required' });
        }

        // Check if catalog_year exists already
        const { data, error, count } = await supabase
            .from('catalog')
            .select('*', { count: 'exact' })
            .eq('catalog_year', catalog_year)
            .limit(1);

        // Check for errors
        if (error) {
            console.error('Supabase catalog read error:', error);
            return res.status(500).json({ error: 'Failed to read catalog table' });
        }

        // Insert additional user data into users table
        const { data: inserted_catalog, error: insert_error } = await supabase
            .from('catalog')
            .insert([
                {
                    catalog_year: catalog_year,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            ])
            .select()
            .single();
        
        if (insert_error) {
            console.log(insert_error)
            return res.status(500).json({ error: 'Failed to create catalog' });
        }

        res.status(201).json({
            message: 'Catalog created successfully',
            catalog: {
                id: inserted_catalog.id,
                catalog_year: inserted_catalog.catalog_year
            }
        });
    } catch (err) {
        console.error('Catalog creation error:', err.message);
        res.status(500).json({ error: 'Catalog creation error' });
    }
});

// Get catalogs
router.get('/catalogs', async (req, res) => {
    const { data, error } = await supabase.from('catalogs').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
});

// View Catalog
router.get('/catalogs/:catalog_year', async (req, res) => {
    const { catalog_year } = req.params;
    const { data, error } = await supabase
        .from('sections')
        .select(`
        *,
        semesters:semester_id(
            *
        ),
        courses:course_id(
            *
        )
        `)
        .eq('semesters.year', catalog_year);

    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
});

// Add new course section to existing catalog
router.post('/createCourseSection/:catalogId', async (req, res) => {
    res.send("Create Course Section not implemented yet!");
});

// Remove course section from catalog
router.post('/removeCourseSection/:catalogId', async (req, res) => {
    res.send("Remove Course Section not implemented yet!");
});

// Get all courses
router.get('/courses', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('courses')
            .select('*')
            .order('course_code', { ascending: true });

        if (error) {
            console.error('Error fetching courses:', error);
            return res.status(500).json({ error: 'Failed to fetch courses' });
        }

        res.status(200).json(data);
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Add new course
router.post('/createCourse', async (req, res) => {
    res.send("Create Course not implemented yet!");
});

// Update course
router.put('/updateCourse/:courseId', async (req, res) => {
    res.send("Update Course not implemented yet!");
});




module.exports = router;