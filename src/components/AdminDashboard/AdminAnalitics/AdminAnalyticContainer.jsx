'use client'
import CourseAndClassRoom from "@/components/AdminDashboard/AdminAnalitics/CourseAndClassRoom";
import StudentInfo from "@/components/AdminDashboard/AdminAnalitics/StudentInfo";
import StudentChart from "@/components/AdminDashboard/AdminAnalitics/StydentChart";
import TeacherInfo from "@/components/AdminDashboard/AdminAnalitics/TeacherInfo";
import ActivityCast from "@/components/AdminDashboard/DashboardActivity/ActivityCast";
import React, { useState } from "react";


const AdminAnalyticContainer = () => {
  return (
    <div className="w-full p-5">
      <ActivityCast />
     <TabBar/>
    </div>
  );
};

export default AdminAnalyticContainer;

const TabBar = () => {
  const [searchUser, setSearchUser] = useState({});
  const [email, setEmail] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [value, setValue] = useState("1");
  const [courseLength, setCourseLength] = useState("");
  const [classroomLength, setClassroomLength] = useState("");

  const [sumOfQuestionMarks, setSumOfQuestionMarks] = useState(null);
  const [sumOfTotalQuestionMarks, setSumOfTotalQuestionMarks] = useState(null);
  const [sumOfQuizMarks, setSumOfQuizMarks] = useState(null);
  const [sumOfTotalQuizMarks, setSumOfTotalQuizMarks] = useState(null);

  return (
    <div className="w-full mt-10">
      {/* Tabs */}
      <div className="flex items-center border-b border-gray-200 rounded-md bg-primary w-1/5 p-1">
        <button
          onClick={() => setValue("1")}
          className={`text-sm font-medium py-2 px-4 rounded-md ${
            value === "1" ? "bg-secondary" : ""
          }`}
        >
          Student
        </button>
        <button
          onClick={() => setValue("2")}
          className={`text-sm font-medium py-2 px-4 rounded-md ${
            value === "2" ? "bg-secondary" : ""
          }`}
        >
          Teacher
        </button>
      </div>

      {/* Panel: Student */}
      {value === "1" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
          <div className="col-span-12 lg:col-span-8 bg-white rounded-md shadow p-4">
            {/* Student Chart */}
            <StudentChart
              searchUser={searchUser}
              email={email}
              setSumOfQuestionMarks={setSumOfQuestionMarks}
              setSumOfTotalQuestionMarks={setSumOfTotalQuestionMarks}
              setSumOfQuizMarks={setSumOfQuizMarks}
              setSumOfTotalQuizMarks={setSumOfTotalQuizMarks}
            />
          </div>
          <div className="col-span-12 lg:col-span-4 bg-white rounded-md shadow p-4">
            {/* Student Info */}
            <StudentInfo
              lay="flex items-center"
              setSearchUser={setSearchUser}
              setEmail={setEmail}
              email={email}
              searchUser={searchUser}
              sumOfQuestionMarks={sumOfQuestionMarks}
              sumOfTotalQuestionMarks={sumOfTotalQuestionMarks}
              sumOfQuizMarks={sumOfQuizMarks}
              sumOfTotalQuizMarks={sumOfTotalQuizMarks}
            />
          </div>
        </div>
      )}

      {/* Panel: Teacher */}
      {value === "2" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
          <div className="col-span-12 lg:col-span-8 bg-white rounded-md shadow p-4">
            {/* Course and Classroom */}
            <CourseAndClassRoom
              setTeacherEmail={setTeacherEmail}
              teacherEmail={teacherEmail}
              setCourseLength={setCourseLength}
              setClassroomLength={setClassroomLength}
            />
          </div>
          <div className="col-span-12 lg:col-span-4 bg-white rounded-md shadow p-4">
            {/* Teacher Info */}
            <TeacherInfo
              lay="flex items-center"
              setSearchUser={setSearchUser}
              setEmail={setEmail}
              email={email}
              searchUser={searchUser}
              sumOfQuestionMarks={sumOfQuestionMarks}
              sumOfTotalQuestionMarks={sumOfTotalQuestionMarks}
              sumOfQuizMarks={sumOfQuizMarks}
              sumOfTotalQuizMarks={sumOfTotalQuizMarks}
              setTeacherEmail={setTeacherEmail}
              teacherEmail={teacherEmail}
              courseLength={courseLength}
              classroomLength={classroomLength}
            />
          </div>
        </div>
      )}
    </div>
  );
};
