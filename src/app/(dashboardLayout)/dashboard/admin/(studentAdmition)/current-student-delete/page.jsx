'use client'
import React, { useEffect, useState } from 'react';

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/current-students`;

const DeleteStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');

  // Fetch all students on mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setStudents(data.data || []);
      } catch (err) {
        setError('Failed to fetch students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this student?');
    if (!confirm) return;

    setDeletingId(id);

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (res.ok) {
        setStudents((prev) => prev.filter((s) => s._id !== id));
      } else {
        alert(data.message || 'Failed to delete student');
      }
    } catch (err) {
      alert('Network error');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Current Students</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {students.map((student) => (
            <li
              key={student._id}
              style={{
                marginBottom: '16px',
                padding: '12px',
                border: '1px solid #ccc',
                borderRadius: '8px',
              }}
            >
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Subject:</strong> {student.subject}</p>
              <p><strong>Date:</strong> {student.date}</p>
              <p><strong>Location:</strong> {student.location}</p>
              <p><strong>Time:</strong> {student.time}</p>
              <button
                onClick={() => handleDelete(student._id)}
                disabled={deletingId === student._id}
                style={{
                  backgroundColor: '#ff4d4f',
                  color: '#fff',
                  padding: '6px 12px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                {deletingId === student._id ? 'Deleting...' : 'Delete'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeleteStudent;
