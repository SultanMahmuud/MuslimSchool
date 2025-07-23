'use client'
import { useEffect, useState } from "react";
import axios from "axios";
// import { toast } from "react-toastify";
import useUpload from "@/components/Hooks/useUpload";
import Rb from "@/components/Shared/FileUpload/FileUpload";


const EditClassRoom = () => {
  const [classRoom, setClassRoom] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/classRoom`)
      .then((res) => res.json())
      .then((data) => setClassRoom(data.data));
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-6">
        {classRoom?.map((element) => (
          <ClassRoomCard key={element._id} element={element} />
        ))}
      </div>
    </div>
  );
};

export default EditClassRoom;

const ClassRoomCard = ({ element }) => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    axios
      .put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/getByFiltered`, {
        emails: element?.assignedTeacher,
      })
      .then((res) => setTeachers(res?.data.data));
  }, [element]);

  return (
    <div className="bg-white shadow-md rounded p-2">
      <div className="flex flex-col items-center justify-center py-2">
        <h2 className="font-semibold text-lg">{element.department}</h2>
        <p className="text-sm font-normal">
          {element.slogan?.slice(0, 30)}
        </p>
      </div>
      <img
        src={element?.image}
        alt="classroom"
        className="w-full h-40 object-cover rounded"
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600 text-sm font-light">
            +{element?.accessedStudent.length} <UpdateStudents {...element} />
          </span>
          <span className="text-gray-600 text-sm font-light">
            Room No: {element.roomNo}
          </span>
        </div>
        <div>
          {teachers?.map((teacher, index) => (
            <div
              key={index}
              className="flex items-center gap-2 my-1 px-2 py-1 border border-gray-200 rounded shadow"
            >
              <img
                src={teacher?.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm text-gray-600">{teacher?.email}</span>
            </div>
          ))}
          <hr className="my-2" />
          <div className="p-2 border rounded shadow">
            <p className="text-sm text-gray-600">{element.subject}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const UpdateStudents = ({ accessedStudent, _id, assignedTeacher, ...element }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="text-blue-500 underline ml-1" onClick={() => setOpen(true)}>
        Update
      </button>
      {open && (
        <div className="fixed inset-0 bg-transparent  flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded shadow w-full max-w-md">
            <Student
              accessedStudent={accessedStudent}
              id={_id}
              assignedTeacher={assignedTeacher}
              element={element}
              handleClose={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

function Student({ accessedStudent, id, assignedTeacher, element, handleClose }) {
  const { handleSubmit, setFile, file, url, setUrl } = useUpload();
  const [roleUsers, setRoleUsers] = useState();
  const [roleTeachers, setRoleTeacher] = useState([]);
  const [student, setStudent] = useState(accessedStudent);
  const [teacher, setTeacher] = useState(assignedTeacher);
  const [department, setDepartment] = useState(element?.department);
  const [subject, setSubject] = useState(element?.subject);
  const [slogan, setSlogan] = useState(element?.slogan);
  const [room, setRoom] = useState(element?.roomNo);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/role/student`)
      .then((res) => res.json())
      .then((db) => setRoleUsers(db?.data));

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/role/teacher`)
      .then((res) => res.json())
      .then((db) => setRoleTeacher(db?.data));
  }, []);

  const handleUpdateStudent = () => {
    const data = {
      department,
      slogan,
      subject,
      assignedTeacher: teacher,
      roomNo: room,
      accessedStudent: student,
      image: url || element?.image,
    };

    axios
      .put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/classRoom/accessedStudent/${id}`, data)
      .then((res) => {
        if (res.status === 201) {
          alert("Successfully updated");
          handleClose();
        }
      });
  };

  const handleDeleteClassRoom = () => {
    if (confirm("Once deleted, data cannot be recovered")) {
      setLoading(true);
      axios
        .delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/classRoom/delete-classroom/${id}`)
        .then((res) => {
          if (res.status === 200) {
            alert("Classroom deleted");
          }
        });
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        className="w-full border p-2 rounded"
        placeholder="Room No"
        defaultValue={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <input
        type="text"
        className="w-full border p-2 rounded"
        placeholder="Department"
        defaultValue={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <input
        type="text"
        className="w-full border p-2 rounded"
        placeholder="Slogan"
        defaultValue={slogan}
        onChange={(e) => setSlogan(e.target.value)}
      />
      <input
        type="text"
        className="w-full border p-2 rounded"
        placeholder="Subject"
        defaultValue={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      {/* Replace below with proper autocomplete or select inputs */}

      <Rb
        handleSubmit={handleSubmit}
        setFile={setFile}
        file={file}
        url={url}
        setUrl={element?.image}
      />

      <div className="flex justify-between">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleDeleteClassRoom}
        >
          Delete Classroom
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded"
          onClick={handleUpdateStudent}
        >
          Update
        </button>
      </div>
    </div>
  );
}
