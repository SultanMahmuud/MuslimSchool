import ClassRoomCard from "@/components/Shared/ClassRoomCard/ClassRoomCard";
import CourseCard from "@/components/Shared/CourseCard/CourseCard";
import React, { useEffect, useState } from "react";


const CourseAndClassRoom = ({ teacherEmail, setCourseLength, setClassroomLength }) => {
  const [courses, setCourses] = useState(null);
  const [classRoom, setClassRoom] = useState(null);
  

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/course/teacher/${teacherEmail}`)
      .then((res) => res.json())
      .then((db) => {
        setCourses(db?.data);
        setCourseLength(db?.data?.length);
      });

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/classRoom/teacher/${teacherEmail}`)
      .then((res) => res.json())
      .then((db) => {
        setClassRoom(db?.data);
        setClassroomLength(db?.data?.length);
      });
  }, [teacherEmail]);

  return (
    <div className="px-4">
      {/* Courses Section */}
      <h2 className="text-base font-semibold text-gray-700 mb-3">Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* {courses?.map((element, index) => (
          <CourseCard element={element} key={index} />
        ))} */}
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-gray-200" />

      {/* Classroom Section */}
      <h2 className="text-base font-semibold text-gray-700 mb-3">Classroom</h2>
      <div className="grid grid-cols-1 gap-4">
        {classRoom?.map((element, index) => (
          <ClassRoomCard
            key={index}
            element={element}
            dashboard="adminDashboard"
          />
        ))}
      </div>
    </div>
  );
};

export default CourseAndClassRoom;
