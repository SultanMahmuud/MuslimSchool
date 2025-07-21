import Link from "next/link";
import AboutAndDetails from "./AboutAndDetails";
import Abouttopbar from "./AboutTopBar";
import MostPopularCourses from "../Homepage/MostPopularCourses/MostPopularCourses";

const About = () => {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        <AboutAndDetails />
        <Abouttopbar />
        <MostPopularCourses />
      </div>
    </>
  );
};

export default About;
