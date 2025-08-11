import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

// import StudentCastCheck from "./StudentCastCheck";
// import StudentEmailInfo from "./StudentEmailInfo";
// import StudentInfoSms from "./StudentInfoSms";
import { GetTotalClass } from "@/utils/GetTotalClass";

const TeacherInfo = ({

  setTeacherEmail,
  classroomLength,
  courseLength,
}) => {
  const [searchTeacher, setTeacher] = useState([]);
  const studentRef = useRef("");
  const [email, setEmail] = useState("");

  const getStudentByEmail = () => {
    
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/single/${email}`)
      .then((res) => res.json())
      .then((db) => {
        setTeacher(db?.data);
        setTeacherEmail(db?.data?.email);
      });
  };

  // Unused data (kept for future logic or calculations)
  const [classroom, setClassroom] = useState([]);
  const [totalClass, setTotalClass] = useState(0);
  const [teacherDetail, setTeacherDetail] = useState({});
  const [presentDay, setPresentDay] = useState([]);
  const [courses, setCourses] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/classroom/teacher/${email}`)
      .then((res) => res.json())
      .then((data) => setClassroom(data.data || []));

    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/single/${email}`)
      .then((res) => setTeacherDetail(res?.data?.data));
  }, [email]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/course/teacher/${teacherDetail?.email}`)
      .then((res) => setCourses(res?.data?.data || []));

    const totalPay = teacherDetail?.teacherPayment?.reduce(
      (acc, curr) => acc + curr.amountOfPayment,
      0
    );
    setTotalPayment(totalPay);
  }, [teacherDetail, email]);

  useEffect(() => {
    const allClasses = classroom?.map((clssrm) => clssrm.classes);
    const flatAllClasses = allClasses?.reduce((acc, curr) => acc.concat(curr), []);
    const classNumberArray = flatAllClasses?.map((singleClass) =>
      GetTotalClass(singleClass.startingDate, singleClass.selectedDays)
    );

    setTotalClass(classNumberArray?.reduce((acc, curr) => acc + curr, 0));

    const presentDates = teacherDetail?.attendance?.map((attend) => attend.presentDate);
    setPresentDay(presentDates || []);
  }, [email, classroom, teacherDetail]);

  const activeDataTeacher = [
    { heading: "Total Course", count: courseLength || 0 },
    { heading: "Number", count: searchTeacher?.number || "No number" },
    { heading: "Classroom", count: classroomLength || 0 },
    { heading: "Join Date", count: searchTeacher?.joiningDate || "YY/MM/DD" },
    { heading: "Total Class", count: totalClass || 0 },
    { heading: "Miss Class", count: totalClass - presentDay?.length || 0 },
    {
      heading: "Last Payment",
      count: searchTeacher?.teacherPayment?.slice(-1)[0]?.amountOfPayment || 0,
    },
    { heading: "Email", count: searchTeacher?.email },
    { heading: "ID", count: searchTeacher?.teacherId },
  ];

  return (
    <div className="px-4">
      {/* Input & Button */}
      <div className="flex gap-2">
        <input
          ref={studentRef}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Enter Teacher Email"
          className="w-full border border-gray-300 text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={getStudentByEmail}
          className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md shadow"
        >
          Click
        </button>
      </div>

      {/* Data Cards */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
        {activeDataTeacher?.map((element, index) => (
          <div key={index} className="bg-white rounded-md shadow p-3">
            {/* <StudentCastCheck element={element} searchUser={searchTeacher?.avatar} /> */}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-around mt-6">
        {/* <StudentEmailInfo email={searchTeacher?.email} primary="Send email" /> */}
        {/* <StudentInfoSms row={searchTeacher?.number} primary="Send SMS" /> */}
      </div>
    </div>
  );
};

export default TeacherInfo;
