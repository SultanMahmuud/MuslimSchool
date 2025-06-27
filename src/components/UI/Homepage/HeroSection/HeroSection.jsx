import { MdOutlineDoubleArrow } from "react-icons/md";
import engImg from "@/assets/Banner BN V1.jpg";
import Image from "next/image";


const HeroSection = () => {
  return (
    <>
      <div className="my-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: Text */}
            <div>
              <p className="text-primary text-xl font-bold leading-relaxed mb-2">
                কোরআন, হাদিস ও দ্বীনের সঠিক জ্ঞান লাভের সুযোগ দক্ষ ও অভিজ্ঞ আলেম
                দ্বারা লাইভ ক্লাস
              </p>
              <h2 className="text-black text-xl md:text-2xl font-extrabold leading-tight mb-4">
                ঘরে বসেই শিখুন কুরআন শিক্ষা,
                <br />
                আরবি ভাষা ও ইসলামি স্টাডিজ
              </h2>
              <p className="text-base md:text-lg font-semibold text-gray-700 mb-6">
                এখনই জয়েন করুন আমাদের প্রোগ্রামে এবং দ্বীনের জ্ঞান অর্জন করুন
                সহজে ঘরে বসেই
                <br />
                নিয়মিত পরীক্ষার ব্যবস্থা ও সার্টিফিকেটসহ কোর্সসমূহ
              </p>

              <div className="flex gap-4 flex-wrap">
                <button
                  // onClick={JoinFreeClass}
                  className="flex items-center gap-2 bg-yellow-400 text-black font-semibold text-lg px-6 py-3 rounded-md shadow hover:bg-yellow-500 transition"
                >
                  ফ্রি ক্লাস
                  <MdOutlineDoubleArrow className="text-xl" />
                </button>

                <button className="flex items-center gap-2 bg-primary text-white font-semibold text-lg px-6 py-3 rounded-md hover:bg-primary/90 transition">
                  এখনই যোগ দিন
                  <MdOutlineDoubleArrow className="text-xl" />
                </button>
              </div>
            </div>

            {/* Right: Image */}
            <div>
              <Image
                src={engImg}
                alt="Banner"
                className="w-full h-auto max-h-[450px] object-contain pt-4"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
