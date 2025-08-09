
import CourseDetails from '@/components/AllPages/CourseDetailsPage/CourseDetails/CourseDetails'
import React from 'react'


const page = ({ params }) => {
  console.log(params.courseId,'........')
  return (
    <div>
      <CourseDetails courseID={params.courseId} />
    </div>
  );
};


export default page
