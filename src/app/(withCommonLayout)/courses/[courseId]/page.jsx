// app/course/[courseId]/page.jsx (server component by default)
import CourseDetails from '@/components/AllPages/CourseDetailsPage/CourseDetails/CourseDetails';

export default async function Page({ params }) {
  
  const { courseId } = await params;
console.log("Course ID:", courseId); // Debugging line to check courseId
  return (
    <div>
      <CourseDetails courseID={courseId} />
    </div>
  );
}
