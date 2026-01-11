'use client';
import dynamic from "next/dynamic";
import BestReviews from "../Homepage/BestReviews/BestReviews";

import AboutAndDetails from "./AboutAndDetails";
import Abouttopbar from "./AboutTopBar";


const CommonCourse = dynamic(() => import("../Homepage/MostPopularCourses/CommonCourse"), {
  ssr: false,
});

const About = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        <AboutAndDetails />
        <Abouttopbar />
       <CommonCourse/>
        <BestReviews />
      </div>
    </>
  );
};

export default About;
