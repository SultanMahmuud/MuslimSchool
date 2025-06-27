'use client'

import { useEffect, useState } from "react"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import FamousBar from "./FamousBar"

// ✅ Mock CourseCard component
const CourseCard = ({ course }) => (
  <div className="bg-white border rounded-lg shadow-md p-4 m-2 h-full w-2/3 mx-auto">
    <img
      src={course.image}
      alt={course.title}
      className="w-full h-40 object-cover rounded"
    />
    <h3 className="text-lg font-bold mt-2">{course.title}</h3>
    <p className="text-sm text-gray-600">{course.description}</p>
  </div>
)

// ✅ Mock data
const demoCourses = [
  {
    id: 1,
    title: "তাজভীদ শিক্ষা",
    description: "প্রথম শ্রেণির তাজভীদ শেখার কোর্স",
    image: "https://via.placeholder.com/300x200.png?text=Course+1",
  },
  {
    id: 2,
    title: "আরবি ভাষা শিক্ষা",
    description: "প্রাথমিক আরবি ভাষা শেখার কোর্স",
    image: "https://via.placeholder.com/300x200.png?text=Course+2",
  },
  {
    id: 3,
    title: "হাদিস ও ফিকহ",
    description: "ইসলামের মূল শিক্ষাগুলো বোঝার কোর্স",
    image: "https://via.placeholder.com/300x200.png?text=Course+3",
  },
  {
    id: 4,
    title: "নূরানী কায়দা",
    description: "শিশুদের জন্য সহজ কোরআন শেখা",
    image: "https://via.placeholder.com/300x200.png?text=Course+4",
  },
  {
    id: 5,
    title: "ইসলামি ইতিহাস",
    description: "নবী ও সাহাবিদের জীবনী সম্পর্কে জানুন",
    image: "https://via.placeholder.com/300x200.png?text=Course+5",
  },
]




var sliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
 
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

const MostPopularCourses = () => {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    // Simulate async fetch
    setTimeout(() => {
      setCourses(demoCourses)
    }, 500)
  }, [])

  return (
    <div className="bg-white py-8 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className=" mb-6 flex flex-col items-center">
          <p className="inline-block text-sm font-bold bg-gray-100 text-green-500 rounded px-4 py-2 ">
            ২৫,০০০+  বেশি লাইভ ক্লাসে অংশগ্রহণ করেছেন
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 my-4">
            জনপ্রিয় কোর্সসমূহ
          </h2>
          <FamousBar/>
        </div>

        {courses.length > 0 ? (
          <Slider {...sliderSettings}>
            {courses.map((course) => (
              <div className="max-w-6xl mx-auto">
               <CourseCard key={course.id} course={course} />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="text-center text-gray-500">লোড হচ্ছে...</div>
        )}
      </div>
    </div>
  )
}

export default MostPopularCourses
