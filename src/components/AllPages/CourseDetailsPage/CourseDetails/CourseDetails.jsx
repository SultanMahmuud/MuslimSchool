"use client";

import { useEffect, useState } from "react";

import { MdOutlineDoubleArrow } from "react-icons/md";
import CourseDetailsLeft from "../CourseDetailsLeft";
import CourseDetailsRight from "../CourseDetailsRight";
import axios from "axios";
import Image from "next/image";


const CourseDetails = ({ courseID }) => {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);

useEffect(() => {
  if (!courseID) return; 

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/course/${courseID}`;
      console.log("Fetching:", url); // 🔍 Debug
      const response = await axios.get(url);
      setCourse(response.data?.data);
    } catch (error) {
      console.error("Failed to fetch course:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchCourse();
}, [courseID]); // ✅ run only when courseID changes



  const HandleEnrollNow = () => {
    if (!course) return;
    window.location.href = `/check-out/${course._id}`;
  };

  const trailClass = () => {
    window.location.href = "/trial-class";
  };

  return (
    <div className="relative">
   

        <section className=" py-6 w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-9">
                {course && (
                  <CourseDetailsLeft
                    data={course}
                    trailClass={trailClass}
                    HandleEnrollNow={HandleEnrollNow}
                  />
                )}
                
              </div>
              <div className="hidden md:block md:col-span-3">
              {course && (
                <CourseDetailsRight
                  data={course}
                  trailClass={trailClass}
                  HandleEnrollNow={HandleEnrollNow}
                />
              )}
              
            </div>
          </div>
           
          )}
        </section>

        {/* Mobile Bottom Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-green-400 shadow-md z-50">
          <div className="flex flex-col px-4 py-2 space-y-2">
            <div className="flex items-center justify-between text-gray-800 font-semibold">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-gray-800">
                  ৳{course?.banSalePrice || course?.price}
                </span>
                <del className="text-sm text-gray-500">
                  ৳{course?.banPrice || course?.salePrice}
                </del>
              </div>

              {course?.courseTime && (
                <div className="flex items-center bg-red-100 text-red-600 text-sm font-medium px-2 py-1 rounded-md">
                  <Image
                    src="https://qawamiuniversity.nyc3.digitaloceanspaces.com/courseIcons/clock%20(2).svg"
                    alt="Clock"
                    className="w-5 h-5 mr-1"
                    width={40}
                    height={40} 
                  />
                  {course?.courseTime}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={trailClass}
                className="flex-1 flex items-center justify-center gap-1 bg-yellow-100 text-yellow-700 font-semibold py-2 rounded-md text-base"
              >
                ফ্রি ক্লাস
                <MdOutlineDoubleArrow className="text-xl" />
              </button>
              <button
                onClick={HandleEnrollNow}
                className="flex-1 flex items-center justify-center gap-1 bg-yellow-400 text-black font-semibold py-2 rounded-md text-base"
              >
                এখনই ভর্তি হোন
                <MdOutlineDoubleArrow className="text-xl" />
              </button>
            </div>
          </div>
        </div>
    
    </div>
  );
};

export default CourseDetails;
