'use client'
import {  useState } from 'react';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { MdOutlineDoubleArrow } from 'react-icons/md';

import { Button } from '@/components/UI/button';
import Image from 'next/image';

const CourseDetailsRight = ({ data, trailClass, HandleEnrollNow }) => {

  const [showAll, setShowAll] = useState(false);
  const itemsToShowInitially = 4;
  const courseFutureValues = Object.values(data?.courseFuture || {});


  return (
    <div className="w-full space-y-4 sticky top-20">
      <div className=" border-2 border-green-400 rounded-md shadow p-4 bg-white">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-green-600">৳{data?.banSalePrice || data?.price}</div>
          <div className="text-lg line-through text-gray-500">৳{data?.banPrice || data?.salePrice}</div>
          {data?.singleHighlighter && (
            <div className="flex items-center text-red-600 bg-red-100 px-3 py-1 rounded text-sm font-bold">
              <Image src="" alt="clock" className="w-4 h-4 mr-2" width={16} height={16} />
              {data?.singleHighlighter}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <Button
            onClick={trailClass}
            className='banner-button-1'
          >
            ফ্রি ক্লাস করে দেখুন <MdOutlineDoubleArrow className="text-xl" />
          </Button>

          <Button
            onClick={HandleEnrollNow}
            className="banner-button-2"
          >
            এখনই ভর্তি হোন <MdOutlineDoubleArrow className="text-xl" />
          </Button>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex justify-between text-gray-700 font-semibold">
            <span>মোট ক্লাস</span>
            <span className="bg-gray-100 px-3 py-1 rounded">{data?.durationHr}</span>
          </div>
          <div className="flex justify-between text-gray-700 font-semibold">
            <span>সার্টিফিকেট প্রদান</span>
            <span className="bg-gray-100 px-3 py-1 rounded">{data?.certificate ? 'হ্যা' : 'না'}</span>
          </div>
          <div className="flex justify-between text-gray-700 font-semibold">
            <span>লাইফটাইম এক্সেস</span>
            <span className="bg-gray-100 px-3 py-1 rounded">{data?.access === 'true' ? 'হ্যা' : 'না'}</span>
          </div>
          <div className="flex justify-between text-gray-700 font-semibold">
            <span>কোর্সটি করেছেন</span>
            <span className="bg-gray-100 px-3 py-1 rounded">{data?.article}</span>
          </div>
          <div className="flex justify-between text-gray-700 font-semibold">
            <span>কোর্সের ধরণ</span>
            <span className="bg-gray-100 px-3 py-1 rounded">{data?.medium}</span>
          </div>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
        <div className="flex items-center justify-center gap-2 text-orange-500 text-lg font-bold">
          <Image
            src="https://qawamiuniversity.nyc3.digitaloceanspaces.com/courseIcons/contacting%20(1).svg"
            alt="call"
            className="w-5 h-5"
            width={20}
            height={20}
          />
          
          <span>কল করুন</span>
          <a href="tel:+8801947200111" className="underline">+8801947200111</a>
        </div>
        <div className="text-sm text-gray-500 mt-1 font-bold">(সকাল ১০টা থেকে রাত ১০টা)</div>
      </div>

      </div>

      <div className="bg-white shadow rounded p-4 space-y-2">
        {courseFutureValues?.map((item, index) => {
          if (!showAll && index >= itemsToShowInitially) return null;
          return (
            <div key={index} className="flex items-start gap-2 text-gray-800">
              <IoMdCheckboxOutline className="text-green-600 text-xl mt-1" />
              <p className="text-base font-medium">{item}</p>
            </div>
          );
        })}

        {courseFutureValues.length > itemsToShowInitially && (
          <Button
            onClick={() => setShowAll(!showAll)}
            className="mt-2 text-white  px-4 py-2 rounded"
          >
            {showAll ? 'Show Less' : 'Show More'}
          </Button>
        )}
      </div>

      
    </div>
  );
};

export default CourseDetailsRight;