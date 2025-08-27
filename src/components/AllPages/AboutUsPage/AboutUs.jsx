
import BestReviews from "../Homepage/BestReviews/BestReviews";
import CommonCourse from "../Homepage/MostPopularCourses/CommonCourse";
import AboutAndDetails from "./AboutAndDetails";
import Abouttopbar from "./AboutTopBar";

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
