
import LearningPlans from "./LearningPlans";

const OurServiceSection = () => {
 

 

       
  
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900">
          শেখার <span className="text-green-600">বিকল্প</span> সমূহ
        </h2>
        <p className="mt-3 text-gray-700 font-medium text-lg">
          আপনার পছন্দমতো কোর্স, লাইভ ব্যাচ বা ব্যক্তিগত ক্লাস থেকে শুরু করুন।
        </p>
      </div>

      <LearningPlans/>
    </section>
  );
};

export default OurServiceSection;
