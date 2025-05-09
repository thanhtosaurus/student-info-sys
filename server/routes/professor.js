const express = require('express');
const router = express.Router();
const supabase = require('../db');

// View class roll for a specific course section
router.get('/class-roll/:courseCode/:sectionId', async (req, res) => {
    try {
        const { courseCode, sectionId } = req.params;

        // 1. Find the section by sectionId and join courses to filter by courseCode
        const { data: sectionData, error: sectionError } = await supabase
            .from('sections')
            .select('section_id, course_id, courses(course_code, course_title)')
            .eq('section_id', sectionId)
            .eq('courses.course_code', courseCode)
            .single();

        if (sectionError || !sectionData) {
            return res.status(404).json({ error: 'Section not found for the specified course code and section id' });
        }

        // 2. Get all enrollments for this section_id, join users for student info
        const { data: enrollments, error: enrollmentsError } = await supabase
            .from('enrollments')
            .select('grade, student_uuid, users(id, first_name, last_name, email)')
            .eq('section_id', sectionId);

        if (enrollmentsError) {
            console.error('Supabase error:', enrollmentsError);
            return res.status(500).json({ error: 'Database error' });
        }

        if (!enrollments || enrollments.length === 0) {
            return res.status(404).json({ error: 'No students found in this section' });
        }

        // 3. Format the response
        const classRoll = {
            course_info: {
                course_code: sectionData.courses.course_code,
                course_title: sectionData.courses.course_title,
                section_number: sectionData.section_number
            },
            students: enrollments.map(row => ({
                student_id: row.users.id,
                first_name: row.users.first_name,
                last_name: row.users.last_name,
                email: row.users.email,
                grade: row.grade
            }))
        };

        res.json(classRoll);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Drop student from class
router.delete('/drop-student', async (req, res) => {
    try {
        const { courseCode, section, studentId } = req.body;

        // Validate required fields
        if (!courseCode || !section || !studentId) {
            return res.status(400).json({ error: 'Course code, section, and student ID are required' });
        }

        // 1. Get the course_id from the course_code
        const { data: courseData, error: courseError } = await supabase
            .from('courses')
            .select('course_id')
            .eq('course_code', courseCode)
            .single();

        if (courseError || !courseData) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // 2. Get the section_id using course_id and section number
        const { data: sectionData, error: sectionError } = await supabase
            .from('sections')
            .select('section_id')
            .eq('course_id', courseData.course_id)
            .eq('section_number', section)
            .single();

        if (sectionError || !sectionData) {
            return res.status(404).json({ error: 'Section not found for the selected course' });
        }

        // 3. Delete the enrollment record
        const { error: deleteError } = await supabase
            .from('enrollments')
            .delete()
            .eq('student_uuid', studentId)
            .eq('section_id', sectionData.section_id);

        if (deleteError) {
            console.error('Error dropping student:', deleteError);
            return res.status(500).json({ error: 'Failed to drop student from class' });
        }

        res.json({ message: 'Student successfully dropped from class' });
    } catch (err) {
        console.error('Error in drop-student route:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router; 