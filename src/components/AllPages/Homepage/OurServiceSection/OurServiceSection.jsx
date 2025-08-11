
import LearningPlans from "./LearningPlans";

const OurServiceSection = () => {

  
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900">
        আমরা  <span className="text-primary">৩ ধরণের</span> লার্নিং প্ল্যান অফার করি
        </h2>
        <p className="mt-3 text-gray-700 font-medium text-xl">
          আপনি যেকোনো একটি সিলেক্ট করে আনন্দের সাথে
        </p>
      </div>

      <LearningPlans/>
    </section>
  );
};

export default OurServiceSection;
