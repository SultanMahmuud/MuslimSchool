
import CourseSlider from './CourseSlider';
import FamousBar from './FamousBar';


const getCourses = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/course`, {
    cache: 'force-cache', 
  });
  const data = await res.json();
  return data?.data || [];
};

const MostPopularCoursesPage = async() => {
  const courses = await getCourses();

  return (
    <div className="bg-white py-8 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 flex flex-col items-center">
          <p className="inline-block text-sm font-bold bg-[rgb(239_243_241/80%)] text-primary rounded px-4 py-2">
            ২৫,০০০+  বেশি লাইভ ক্লাসে অংশগ্রহণ করেছেন
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold base1 my-4">
            জনপ্রিয় কোর্সসমূহ
          </h2>
          <FamousBar />
        </div>

        {courses && courses.length > 0 ? (
          <CourseSlider courses={courses} />
        ) : (
          <div className="text-center text-gray-500">কোনো কোর্স পাওয়া যায়নি</div>
        )}
      </div>
    </div>
  );
}
export default MostPopularCoursesPage;