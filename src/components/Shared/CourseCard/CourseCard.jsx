'use client';
import  { useState } from "react";
import { FaHeart, FaUniversity } from "react-icons/fa";
import axios from "axios";



import enrolled from "@/assets/cardIcon/Icon/Enrolled.svg";
import liveclass from "@/assets/cardIcon/Icon/Live Classes.svg";
import classNote from "@/assets/cardIcon/Icon/Class Note.svg";
import students from "@/assets/cardIcon/Icon/Total Student.svg";

import { MdFavoriteBorder } from "react-icons/md";
import Image from "next/image";
import { Button } from "@/components/UI/button";

export default function CourseCard({ course }) {
  const [loved, setLoved] = useState(false);

  const rankStyle = {
    Hot: "bg-green-500",
    New: "bg-red-500",
    Bestseller: "bg-red-400",
    Popular: "bg-yellow-500",
    Special: "bg-emerald-500",
  };

  const handleLove = async (id) => {
    try {
      const res = await axios.put(
        `https://api.qawmiuniversity.com/course/like/${id}`,
        { n: 1 }
      );
      if (res.status === 201) {
        setLoved(true);
        // toast("Loved");
      }
    } catch {
      alert("Error! Something went wrong");
    }
  };

  return (
  
      <div className="max-w-[340px] rounded-2xl  border p-3 mb-8">
        {/* Image */}
        <div
          className="relative h-[200px] rounded-xl overflow-hidden mb-4 bg-cover bg-center"
          style={{
            backgroundImage: course?.image
              ? `url("${course.image}")`
              : "url('/fallback.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/10"></div>

          {/* Rank Badge */}
          {course?.rank && (
            <span
              className={`absolute top-2 left-2 px-3 py-1 rounded-full text-white text-xs font-semibold shadow-sm ${rankStyle[course.rank]}`}
            >
              {course.rank}
            </span>
          )}

          {/* Love Button */}
          <div className="absolute top-2 right-2 flex items-center gap-1">
            <Button onClick={() => handleLove(course._id)} className="bg-transparent">
              {!loved ? (
                <MdFavoriteBorder className="text-white" />
              ) : (
                <FaHeart className="text-red-500" />
              )}
            </Button>
            <span className="text-white text-xs">{course?.likes?.length || 0}</span>
          </div>
        </div>

        {/* Star Rating */}
        <div className="px-4 mb-2">
          {/* <StarRating reviews={course?.review} /> */}
        </div>

        {/* Title */}
        <div className="px-2">
          <h3 className="text-xl font-bold base1 mb-2">{course?.title}</h3>

          {/* Time & Seat */}
          <div className="flex flex-wrap gap-2 mb-3">
            {course?.courseTime && (
              <div className="border border-purple-400 bg-purple-100 text-purple-700 text-sm font-semibold px-3 py-1 rounded-md">
                {course.courseTime}
              </div>
            )}
            {course?.courseSeat && (
              <div className="border border-orange-400 bg-orange-100 text-orange-700 text-sm font-semibold px-3 py-1 rounded-md">
                {course.courseSeat}
              </div>
            )}
          </div>

          {/* Features */}
          <div className="flex justify-between gap-2 mb-2">
            <div className="flex items-center bg-gray-100 gap-1 px-3 py-1 rounded-md text-sm text-gray-700">
              <Image src={enrolled} className="w-4 h-4" alt="Enrolled Icon" />
              Enrolled
            </div>
            <div className="flex items-center bg-gray-100 gap-1 px-3 py-1 rounded-md text-sm text-gray-700">
              <Image src={classNote} className="w-4 h-4" alt="Class Note Icon" />
              Class Notes
            </div>
          </div>

          <div className="flex justify-between gap-2 mb-2">
            <div className="flex items-center bg-gray-100 gap-1 px-3 py-1 rounded-md text-sm text-gray-700">
              <Image src={liveclass} className="w-4 h-4" alt="Live Class Icon" />
              Live Classes
            </div>
            <div className="flex items-center bg-gray-100 gap-1 px-3 py-1 rounded-md text-sm text-gray-700">
              <Image src={students} className="w-4 h-4" alt="Student Icon" />
              Students {course?.lesson}
            </div>
          </div>

          {/* Provider and Price */}
          <div className="flex justify-between items-end mt-2">
            <div className="flex items-center text-sm text-gray-600 gap-2">
              <FaUniversity />
              <span className="font-medium">{course?.provider || "Muslim School"}</span>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-800">
                ৳{course?.banSalePrice || course?.salePrice}
              </p>
              <p className="text-sm text-gray-500 line-through">
                ৳{course?.banPrice || course?.price}
              </p>
            </div>
          </div>

          {/* Enroll Button */}
          <Button
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/courses/${course._id}`;
            }}
            className="banner-button-1 w-full mt-3"
          >
            Enroll Now
          </Button>
        </div>
      </div>
   
  );
}
