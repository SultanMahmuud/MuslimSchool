
import React from 'react';
import TeacherCard from '@/components/Shared/TeacherCard/TeacherCard';
import Link from 'next/link';
import { MdArrowRight } from 'react-icons/md';
import { Button } from '@/components/UI/button';

const getAllTeachers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/role/teacher`, {
    cache: 'no-store', // Ensures fresh data on each request
  });
  const data = await res.json();
  return data?.data || [];
};
const AwsomeTeachers = async ({isLoading=false}) => {

  const teachers = await getAllTeachers();


  return (
    <div className="px-4 md:px-10 lg:px-16 py-10">
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h2 className="hind text-2xl sm:text-xl lg:text-3xl font-bold base1">
          আপনার পাশে আছে অসাধারণ শিক্ষক-শিক্ষিকাবৃন্দ
        </h2>
        <p className="hind text-lg sm:text-sm lg:text-xl base2 mt-2 font-medium">
          আপনি পাচ্ছেন সাবজেক্টের সেরা টিচার ফলে কঠিন টপিকও পানির মতো সহজ মনে হবে
        </p>

        <Link href="/teacher">
          <Button className="mt-5 inline-flex items-center gap-2 bg-primary hover:bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold text-base transition-all duration-300">
            সকল শিক্ষক দেখুন
            <MdArrowRight className="text-xl" />
          </Button>
        </Link>
      </div>

      {/* Teacher Cards */}
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {teachers?.slice(0, 4).map((el) => (
           <Link key={el?._id} href={`/${el._id}`}>
            <TeacherCard
              image={el?.avatar || 'https://img.icons8.com/color/128/teacher.png'}
              depart={el?.Department || 'নাজেরা'}
              name={el?.name || 'yasin'}
              joiningDate={el?.joiningDate || '23-5-11'}
              institution={el?.studiedSchool}
              experience={el?.teachingExperience}
              totalSutdents={el?.perAddressLine}
              totalClass={el?.totalClasses || '20'}
              
              qualification={el?.qual1}
            />
           </Link>
           
          ))}
        </div>
      )}
    </div>
  );
};

export default AwsomeTeachers;



