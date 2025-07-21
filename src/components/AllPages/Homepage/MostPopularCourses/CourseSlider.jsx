"use client";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CourseCard from "@/components/Shared/CourseCard/CourseCard";

const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2, slidesToScroll: 1 },
    },
    {
      breakpoint: 640,
      settings: { slidesToShow: 1, slidesToScroll: 1 },
    },
  ],
};
const CourseSlider = ({ courses }) => {
  return (
    <div>
      <Slider {...sliderSettings}>
        {courses.map((course) => (
          <div key={course.id}>
            <CourseCard course={course} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default CourseSlider;
