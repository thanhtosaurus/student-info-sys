import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import '../../styles/ViewCatalog.css';
const ViewCourseCatalog = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const { data, error } = await supabase
                .from('courses')
                .select('*');

            if (error) {
                throw error;
            }

            setCourses(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading courses...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="view-catalog">
            <div className="catalog-header">
                <h2>Course Catalog</h2>
            </div>

            <div className="catalog-table">
                <table>
                    <thead>
                        <tr>
                            <th>Course Code</th>
                            <th>Course Name</th>
                            <th>Description</th>
                            <th>Credits</th>
                            <th>Prerequisites</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <tr key={course.id}>
                                    <td>{course.course_code}</td>
                                    <td>{course.course_title}</td>
                                    <td>{course.description}</td>
                                    <td>{course.units}</td>
                                    <td>{course.status || 'None'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewCourseCatalog; 