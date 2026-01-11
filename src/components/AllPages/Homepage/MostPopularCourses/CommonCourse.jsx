

import CourseSlider from "./CourseSlider";

const getCourses = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/course`, {
      
    });

    if (!res.ok) return "Failed to fetch courses";

    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};
const CommonCourse = async () => {
  const courses = await getCourses();
  return (
    <div>
         {courses && courses.length > 0 ? (
          <CourseSlider courses={courses} />
        ) : (
          <div className="text-center text-gray-500">কোনো কোর্স পাওয়া যায়নি</div>
        )}
    </div>
  )
}

export default CommonCourse
