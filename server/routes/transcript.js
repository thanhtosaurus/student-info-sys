const express = require('express');
const router = express.Router();
const supabase = require('../db'); // Supabase client instance

/**
 * @swagger
 * /api/transcripts/{studentId}:
 *   get:
 *     summary: Get transcript by student ID
 *     tags: [Transcript]
 */
router.get('/:studentId', async (req, res) => {
  const { studentId } = req.params;

  try {
    // Join enrollments -> sections -> courses
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        grade,
        sections (
          term,
          courses (
            course_code,
            course_title,
            units
          )
        )
      `)
      .eq('student_uuid', studentId);

    if (error) {
      console.error('Error fetching transcript:', error);
      return res.status(500).json({ error: 'Failed to fetch transcript' });
    }

    // Return transcript data
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
