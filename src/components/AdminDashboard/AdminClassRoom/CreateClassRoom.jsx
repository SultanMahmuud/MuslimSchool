'use client';

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import useUpload from '@/components/Hooks/useUpload';

import Fileupload from "@/components/Shared/FileUpload/FileUpload"
const CreateClassRoom = () => {
  const { handleSubmit, setFile, file, url, loading } = useUpload();
  const [teacher, setTeacher] = useState([]);
  const [student, setStudent] = useState([]);

  const departmentRef = useRef();
  const sloganRef = useRef();
  const subjectRef = useRef();
  const roomRef = useRef();

  const handleClick = (event) => {
    event.preventDefault();
    const data = {
      department: departmentRef.current?.value,
      slogan: sloganRef.current?.value,
      subject: subjectRef.current?.value,
      assignedTeacher: teacher,
      roomNo: roomRef.current?.value,
      accessedStudent: student,
      image: url,
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/classRoom`, data)
      .then((response) => {
        if (response.status === 200) alert('Sent data to server');
      })
      .catch(() => {});

    
  };

  return (
    <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white h-screen">
      <LeftForm
        departmentRef={departmentRef}
        sloganRef={sloganRef}
        subjectRef={subjectRef}
      />
      <TeacherForm setTeacher={setTeacher} roomRef={roomRef} />
      <StudentForm setStudent={setStudent} />
      <ImageForm
        handleClick={handleClick}
        handleSubmit={handleSubmit}
        setFile={setFile}
        loading={loading}
        url={url}
        file={file}
      />
    </div>
  );
};

export default CreateClassRoom;

const LeftForm = ({ departmentRef, sloganRef, subjectRef }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm mb-1">Department</label>
      <input
        ref={departmentRef}
        type="text"
        placeholder="Classroom name"
        className="w-full p-2 border rounded text-sm"
      />
    </div>
    <div>
      <label className="block text-sm mb-1">Slogan</label>
      <input
        ref={sloganRef}
        type="text"
        placeholder="Enter slogan within 5 words"
        className="w-full p-2 border rounded text-sm"
      />
    </div>
    <div>
      <label className="block text-sm mb-1">Subject</label>
      <input
        ref={subjectRef}
        type="text"
        placeholder="Enter subject within 5 words"
        className="w-full p-2 border rounded text-sm"
      />
    </div>
  </div>
);

const TeacherForm = ({ setTeacher, roomRef }) => {
  const [roleUsers, setRoleUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/role/teacher`)
      .then((res) => setRoleUsers(res.data.data || []))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm mb-1">Teacher</label>
        <select
          multiple
          onChange={(e) =>
            setTeacher([...e.target.selectedOptions].map((o) => o.value))
          }
          className="w-full p-2 border rounded text-sm"
        >
          {roleUsers.map((user) => (
            <option key={user.email} value={user.email}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm mb-1">Room No</label>
        <input
          ref={roomRef}
          type="text"
          placeholder="Classroom number"
          className="w-full p-2 border rounded text-sm"
        />
      </div>
    </div>
  );
};

const StudentForm = ({ setStudent }) => {
  const [roleUsers, setRoleUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/role/student`)
      .then((res) => setRoleUsers(res.data.data || []))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm mb-1">Students</label>
        <select
          multiple
          onChange={(e) =>
            setStudent([...e.target.selectedOptions].map((o) => o.value))
          }
          className="w-full p-2 border rounded text-sm"
        >
          {roleUsers.map((user) => (
            <option key={user.email} value={user.email}>
              {user.email}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const ImageForm = ({ handleClick, handleSubmit, setFile, loading, url, file }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm mb-1">Featured image</label>
      <Fileupload
        handleSubmit={handleSubmit}
        setFile={setFile}
        loading={loading}
        url={url}
        file={file}
      />
    </div>
    {url.length > 3 && (
      <button
        onClick={handleClick}
        className="w-full bg-blue-600 text-white py-2 rounded text-sm mt-2 hover:bg-blue-700"
      >
        Create
      </button>
    )}
  </div>
);
