
import Marquee from "react-fast-marquee";
import ContentCard from "./RecentStudentCard";

const RecentAdmitStudent = () => {
  const studentData = [
    {
      name: "মুহাম্মদ আদিল",
      image: "https://i.ibb.co/LzvXsPv/teacher1.jpg",
      classType: "অনলাইন ক্লাস",
      course: "কোরআন শিক্ষা",
      joinDate: "১২ জুন, ২০২৫",
      location: "ঢাকা, বাংলাদেশ",
    },
    {
      name: "আয়েশা সিদ্দিকা",
      image: "https://i.ibb.co/T1ZrYHj/teacher2.jpg",
      classType: "ফিজিক্যাল ক্লাস",
      course: "হিফজ",
      joinDate: "১৫ জুন, ২০২৫",
      location: "চট্টগ্রাম, বাংলাদেশ",
    },
    {
      name: "মাওলানা শফিক",
      image: "https://i.ibb.co/SfZn5Fh/teacher3.jpg",
      classType: "অনলাইন ক্লাস",
      course: "তাফসীর",
      joinDate: "১০ জুন, ২০২৫",
      location: "রাজশাহী, বাংলাদেশ",
    },
    {
      name: "নূরজাহান বেগম",
      image: "https://i.ibb.co/3WLvBhF/teacher4.jpg",
      classType: "ফিজিক্যাল ক্লাস",
      course: "হাদীস",
      joinDate: "৮ জুন, ২০২৫",
      location: "সিলেট, বাংলাদেশ",
    },
    {
      name: "আব্দুল্লাহ মাহির",
      image: "https://i.ibb.co/8KRCYvT/teacher5.jpg",
      classType: "অনলাইন ক্লাস",
      course: "নাজেরা",
      joinDate: "৫ জুন, ২০",
    },
  ];
  return (
    <div className="py-8 px-4">
      <h2 className="text-center hind text-[26px] md:text-[30px] font-bold text-[#1F2937]">
        সাম্প্রতিক ভর্তি হওয়া শিক্ষার্থীরা
      </h2>
      <p className="text-center hind text-sm md:text-[20px] font-medium text-[#4B5563] pb-6">
        যারা আমাদের মানসম্মত শিক্ষায় আস্থা রেখে ইসলাম শিক্ষার যাত্রা শুরু
        করেছেন
      </p>
      <Marquee direction="right" gradient={false} speed={70}>
        {studentData.map((s, i) => (
          <ContentCard
            key={i}
            name={s.name}
            image={s.image}
            classType={s.classType}
            course={s.course}
            joinDate={s.joinDate}
            location={s.location}
          />
        ))}
      </Marquee>
    </div>
  );
};

export default RecentAdmitStudent;
