'use client'
import axios from 'axios';
import ActivityCastCard from './ActivityCastCard';
import { useEffect, useState } from 'react';


const ActivityCast = () => {


  const [totalStudent, setTotalStudent] = useState([]);
  const [newStudent, setNewStudent] = useState([]);
  const [presentStudent, setPresentStudent] = useState([]);
  const [absentStudent, setAbsentStudent] = useState([]);
  const [assignment, setAssignment] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [totalTeacher, setTotalTeacher] = useState([]);
  const [todayClass, setTodayClass] = useState([]);
  const [totalClass, setTotalClass] = useState(0);

  // Fetch core data

  // set loading for every request
  const [loading, setLoading] = useState(true);
useEffect(() => {
  setLoading(true);
  let completedRequests = 0;
  const totalRequests = 4; // how many axios calls you are making

  const checkAllDone = () => {
    completedRequests += 1;
    if (completedRequests === totalRequests) {
      setLoading(false);
    }
  };

  axios.get(`https://muslim-schoool.onrender.com/user/role/student`)
    .then(res => setTotalStudent(res.data.data))
    .finally(checkAllDone);

  axios.get(`https://muslim-schoool.onrender.com/user/all`)
    .then(res => setTotalUser(res.data.data?.length))
    .finally(checkAllDone);

  axios.get(`https://muslim-schoool.onrender.com/assignment`)
    .then(res => setAssignment(res.data.data || []))
    .finally(checkAllDone);

  axios.get(`https://muslim-schoool.onrender.com/user/role/teacher`)
    .then(res => setTotalTeacher(res.data.data || []))
    .finally(checkAllDone);

}, []);




  const activeData = [
    { heading: 'Total Student', count: totalStudent.length },
    { heading: 'New Student', count: newStudent.length }, // Placeholder
    { heading: 'Present Today', count: presentStudent.length }, // 
    { heading: 'Absent Today', count: absentStudent.length }, // Placeholder
    { heading: 'Assignment', count: assignment.length },
    { heading: 'Total Teacher', count: totalTeacher.length || 0 },
    { heading: 'Today Class', count: todayClass.length },
    { heading: 'Registration', count: totalUser },
    { heading: 'Total Class', count: totalClass }, // Placeholder
  ];

  return (
    <div className="w-full p-2">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-4 gap-2">
        {loading ? (
          <div>Loading...</div>
        ) : (
          activeData.map((item, idx) => (
            <ActivityCastCard key={idx} element={item} loading={loading} />
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityCast;
