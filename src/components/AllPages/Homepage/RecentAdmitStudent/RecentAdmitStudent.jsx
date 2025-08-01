import Marquee from "react-fast-marquee";
import ContentCard from "./RecentStudentCard";
import { DateConversionWithTime } from "@/utils/DateConversionWithTime";


const RecentAdmitStudent = async () => {
  const getAllRecentAdmitStudent = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/current-students`,
    {
      cache: "force-cache", // Use cached data if available
    }
  );
  const data = await res.json();
  return data?.data || [];
};
  const studentData = await getAllRecentAdmitStudent();

  return (
    <div className="py-8 px-4">
      <h2 className="text-center hind text-[26px] md:text-[30px] font-bold base1">
        সাম্প্রতিক ভর্তি হওয়া শিক্ষার্থীরা
      </h2>
      <p className="text-center hind text-sm md:text-[20px] font-medium base2 pb-6">
        যারা আমাদের মানসম্মত শিক্ষায় আস্থা রেখে ইসলাম শিক্ষার যাত্রা শুরু
        করেছেন
      </p>
      <Marquee direction="right" gradient={false} speed={70}>
        {studentData.map((dt, i) => (
          <ContentCard
          key={i}
            name={dt?.name}
            course={dt?.subject || "কোরআন শিক্ষা"}
            joinDate={DateConversionWithTime(dt?.date)}
            location={dt?.location}
            time={dt?.time}
            label={dt?.label}
            classType={dt?.subject}
          />
        ))}
      </Marquee>
    </div>
  );
};

export default RecentAdmitStudent;
