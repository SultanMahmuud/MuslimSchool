import React from 'react';


import CourseFaq from '@/components/AdminDashboard/AdminCourse/CourseFaq';

const CourseStudentFaq = ({data}) => {


  return (
    <div>
      <CourseFaq
            faqData={data?.FAQ}
           
          />
    </div>
  );
};

export default CourseStudentFaq;