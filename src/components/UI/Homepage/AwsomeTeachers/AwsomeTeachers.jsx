'use client';
import TeacherCard from '@/components/Shared/TeacherCard/TeacherCard';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { MdArrowRight } from 'react-icons/md';


const AwsomeTeachers = ({isLoading=false}) => {
const teachers = [
  {
    _id: '1',
    name: 'মাওলানা আবদুল হক',
    Department: 'তাফসীর',
    joiningDate: '2015-01-10',
    studiedSchool: 'দারুল উলুম হাটহাজারী',
    teachingExperience: '৮ বছর',
    perAddressLine: 'চট্টগ্রাম, বাংলাদেশ',
    totalClasses: '24',
    avatar: 'https://i.ibb.co/LzvXsPv/teacher1.jpg',
    qual1: 'মাস্টার্স ইন ইসলামিক স্টাডিজ',
  },
  {
    _id: '2',
    name: 'মুফতি রফিকুল ইসলাম',
    Department: 'হাদীস',
    joiningDate: '2017-06-22',
    studiedSchool: 'জামিয়া ইসলামিয়া পটিয়া',
    teachingExperience: '৬ বছর',
    perAddressLine: 'ঢাকা, বাংলাদেশ',
    totalClasses: '18',
    avatar: 'https://i.ibb.co/T1ZrYHj/teacher2.jpg',
    qual1: 'মুফতি ডিগ্রী',
  },
  {
    _id: '3',
    name: 'হাফেজ মাওলানা কামরুজ্জামান',
    Department: 'হিফজ',
    joiningDate: '2018-03-15',
    studiedSchool: 'আল জামিয়া আল ইসলামিয়া',
    teachingExperience: '৫ বছর',
    perAddressLine: 'বরিশাল, বাংলাদেশ',
    totalClasses: '20',
    avatar: 'https://i.ibb.co/SfZn5Fh/teacher3.jpg',
    qual1: 'হিফজ এবং দাওরায়ে হাদীস',
  },
  {
    _id: '4',
    name: 'মাওলানা মনির হোসাইন',
    Department: 'নাজেরা',
    joiningDate: '2016-11-05',
    studiedSchool: 'মাদানী মাদ্রাসা',
    teachingExperience: '৭ বছর',
    perAddressLine: 'সিলেট, বাংলাদেশ',
    totalClasses: '22',
    avatar: 'https://i.ibb.co/3WLvBhF/teacher4.jpg',
    qual1: 'ফাজিল ডিগ্রী',
  },
];


  return (
    <div className="px-4 md:px-10 lg:px-16 py-10">
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h2 className="hind text-2xl sm:text-xl lg:text-3xl font-bold text-[#1F2937]">
          আপনার পাশে আছে অসাধারণ শিক্ষক-শিক্ষিকাবৃন্দ
        </h2>
        <p className="hind text-lg sm:text-sm lg:text-xl text-[#4B5563] mt-2 font-medium">
          আপনি পাচ্ছেন সাবজেক্টের সেরা টিচার ফলে কঠিন টপিকও পানির মতো সহজ মনে হবে
        </p>

        <Link href="/teacher">
          <button className="mt-5 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold text-base transition-all duration-300">
            সকল শিক্ষক দেখুন
            <MdArrowRight className="text-xl" />
          </button>
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
              
              depart={el?.Department || 'নাজেরা'}
              name={el?.name || 'yasin'}
              joiningDate={el?.joiningDate || '23-5-11'}
              institution={el?.studiedSchool}
              experience={el?.teachingExperience}
              totalSutdents={el?.perAddressLine}
              totalClass={el?.totalClasses || '20'}
              image={el?.avatar}
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
