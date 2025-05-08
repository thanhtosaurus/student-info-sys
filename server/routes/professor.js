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

module.exports = router; 