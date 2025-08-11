import { MdOutlineDoubleArrow } from "react-icons/md";
import engImg from "@/assets/Logo/Bannar/Bannar.jpg";
import Image from "next/image";
import { Button } from "@/components/UI/button";


const HeroSection = () => {
  return (
    <>
      <div className="mb-6">
        <div className="max-w-7xl mx-auto bg-[#faf9f7] p-12 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
            {/* Left: Text */}
            <div>
              <p className="text-primary text-xl font-bold leading-relaxed">
                সহজ উপায়ে উন্নত মানের দ্বীনি শিক্ষা।
              </p>
              <h2 className="base1 text-[36px] font-extrabold leading-tight">
                দ্বীন শেখার নতুন দুনিয়ায়
                <br />
                আপনাকে স্বাগতম
              </h2>
              <p className="base2 font-semibold text-[20px] mb-6">
                সহজ উপায়ে উন্নত মানের দ্বীনি শিক্ষা নিয়ে
                <br />
                আমরা আছি আপনার পাশে, শিখুন প্রাণ খুলে।
              </p>

              <div className="flex gap-4 flex-wrap">
                <Button
                  // onClick={JoinFreeClass}
                  className="banner-button-1"
                >
                  ফ্রি ক্লাস
                  <MdOutlineDoubleArrow className="text-xl" />
                </Button>

                <Button className="banner-button-2">
                  এখনই যোগ দিন
                  <MdOutlineDoubleArrow className="text-xl" />
                </Button>
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
