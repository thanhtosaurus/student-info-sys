const express = require('express');
const router = express.Router();
const supabase = require('../db');

/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Admin operations
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
 *                   name:
 *                     type: string
 *                     description: The user's name
 *                   email:
 *                     type: string
 *                     description: The user's email
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
 */

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
    const { data, error } = await supabase.from('users').select('*').eq('id', id);
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

// Add new course section to existing catalog [SIS-46]
router.post('/addCourseSection', async (req, res) => {
    try {
        // Extract course section details from request body
        const {
          courseId,
          professorId,
          semesterId,
          sectionNumber,
          schedule,
          location,
          maxEnrollment
        } = req.body;
    
        // Validate required fields
        if (!courseId || !semesterId || !sectionNumber) {
          return res.status(400).json({
            success: false,
            message: 'Missing required fields: courseId, semesterId, and sectionNumber are required'
          });
        }

        // Insert details to sections table
        const { data: inserted_data, error: insert_error } = await supabase
            .from('sections')
            .insert([
                {
                    course_id: courseId,
                    professor_id: professorId,
                    semester_id: semesterId,
                    schedule: schedule,
                    location: location,
                    capacity: maxEnrollment
                }
            ])
            .select()
            .single();
        
        if (insert_error) {
            console.log(insert_error)
            return res.status(500).json({ error: 'Failed to add course section to catalog', error_message: insert_error });
        }

    } catch (err) {
        console.error('Error adding course section to catalog:', err.message);
        res.status(500).json({ error: 'Error adding course section to catalog' });
    }
});

// Remove course section from semester table
router.put('/removeCourseSection/', async (req, res) => {
    try {
        // Extract course section details from request body
        const {
            sectionId,
            semesterId
        } = req.body;

        // Validate required fields
        if (!sectionId || !semesterId) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: sectionId and semesterId are required'
            });
        }

        // Remove course section
        const removeSectionQuery = `
            DELETE FROM sections 
            WHERE id = ? AND semester_id = ?
        `;
        
        const [result] = await db.query(removeSectionQuery, [sectionId, semesterId]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Section not found or already removed'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Course section removed successfully'
        });

    } catch (err) {
        console.error('Error removing course section from catalog: ', err.message);
        res.status(500).json({ error: 'Error removing course section from catalog' });
    }
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
    // return json
    
});

// Update course
router.put('/updateCourse/:courseId', async (req, res) => {
    try {
        const { courseId } = req.params;
        const { description, status, units, course_title, course_code } = req.body;

        // Validate required fields
        if (!courseId) {
            return res.status(400).json({ error: 'Course ID is required' });
        }

        // Prepare update data
        const updateData = {};
        if (description !== undefined) updateData.description = description;
        if (status !== undefined) updateData.status = status;
        if (units !== undefined) updateData.units = units;
        if (course_title !== undefined) updateData.course_title = course_title;
        if (course_code !== undefined) updateData.course_code = course_code;

        // Check if there's anything to update
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ error: 'No fields to update provided' });
        }

        // Update the course
        const { data, error } = await supabase
            .from('courses')
            .update(updateData)
            .eq('course_id', courseId)
            .select();

        if (error) {
            console.error('Error updating course:', error);
            return res.status(500).json({ error: 'Failed to update course' });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.json({
            message: 'Course updated successfully',
            course: data[0]
        });
    } catch (error) {
        console.error('Error in updateCourse:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /deactivateUser/{id}:
 *   put:
 *     summary: Deactivate a user
 *     description: Updates the user_status to 'inactive' for a specific user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user's unique identifier
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deactivated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deactivated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     user_status:
 *                       type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/deactivateUser/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('users')
      .update({ user_status: 'inactive' })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'User not found' });
      }
      throw error;
    }

    res.json({
      message: 'User deactivated successfully',
      data
    });
  } catch (error) {
    console.error('Error deactivating user:', error);
    res.status(500).json({ error: 'Failed to deactivate user' });
  }
});

module.exports = router;