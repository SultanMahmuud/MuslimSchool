import Marquee from "react-fast-marquee";
import ContentCard from "./RecentStudentCard";
import { DateConversionWithTime } from "@/utils/DateConversionWithTime";

import malestudent from "@/assets/defaultImage/Student-1.jpg"
import femalestudent from "@/assets/defaultImage/Student-2.jpg"

const RecentAdmitStudent = async () => {
  const getAllRecentAdmitStudent = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/current-students`,
    {
      cache: "no-store", // Use cached data if available
    }
  );
  const data = await res.json();
  return data?.data || [];
};
  const studentData = await getAllRecentAdmitStudent();


  return (
    <div className="py-8 px-4">
      <h2 className="text-center  text-[26px] md:text-[30px] font-bold base1">
        সম্প্রতি যে সমস্ত শিক্ষার্থী <br className="lg:hidden block"/> ভর্তি হয়েছে
      </h2>
      <p className="text-center hind text-[18px] font-medium base2 pb-6">
        যারা আমাদের মানসম্মত শিক্ষায় আস্থা রেখে ইসলাম শিক্ষার যাত্রা শুরু করেছেন
      </p>
      <Marquee direction="right" gradient={false} speed={70}>
        {studentData.map((dt, i) => (
          <ContentCard
          key={i}
          // if student is male then use male image otherwise use female image
          image={dt?.gender === "male" ? malestudent : femalestudent}
            name={dt?.name}
            course={dt?.subject || "কোরআন শিক্ষা"}
            
            joinDate={DateConversionWithTime(dt?.date)}
            location={dt?.location}
            time={dt?.time}
            label={dt?.label}
            classType={dt?.classType}
            
          />
        ))}
      </Marquee>
    </div>
  );
};

export default RecentAdmitStudent;
