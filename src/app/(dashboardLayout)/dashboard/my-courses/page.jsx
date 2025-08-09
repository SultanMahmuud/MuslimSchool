'use client';
 // Assume this uses Tailwind inside

 // Also should be Tailwind-based
import TeacherCourseCard from "@/components/TeacherDashboard/TeacherCourseCard/TeacherCourseCard";
import { useState } from "react";

const TeacherCourse = ({ email ='sharminaktermetu86@gmail.com' }) => {
  // const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (!email) return;

  //   setLoading(true);

  //   fetch(`https://muslim-schoool.onrender.com/course/teacher/${email}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const filteredCourses = data?.data?.filter(
  //         (course) => course.medium === "Record Course"
  //       );
  //       setCourses(filteredCourses || []);
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //     });
  // }, [email]);
const course = {
  _id: "abc123",
  image: "https://placekitten.com/400/250",
  rating: 4.8,
  title: "Tafsir Course for Beginners",
  lesson: 12,
  durationHr: 10,
  durationMt: 30,
  level: "Intermediate",
  price: 100,
  salePrice: 59,
};
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {loading && 
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center">
          <p>Loading courses...</p>
        </div>
      }
      {/* Assuming course is an array of course objects */}
      {!loading && (
        <TeacherCourseCard key={course._id} element={course} />
      )}
    </div>
  );
};

export default TeacherCourse;
