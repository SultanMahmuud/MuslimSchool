"use client";

import ButtonStyle from "@/components/Shared/ButtonStyle";
import Image from "next/image";



const WhyLearnCard = ({data}) => {

const array = data?.courseWhy
  const handleEnrollNow = () => {
    router.push(`/check-out/${cdata?.singleCourse?.data?._id}`);
  };

  return (
    <div className="space-y-4">
      {array?.slice(0, 4).map((card, index) => (
        <div
          key={index}
          className={`flex flex-col ${
            card.layout === "row" ? "md:flex-row" : "md:flex-col"
          } justify-between p-4 shadow-sm rounded-md border gap-4 mx-2`}
        >
          <div className="flex-shrink-0 mx-auto md:mx-0 w-[60%] md:w-[40%]">
            <Image
              src={card.uploadUrl}
              alt="Card Image"
              className="w-full object-cover"
              width={500}
              height={500}
            />
          </div>

          <div className="flex flex-col justify-between px-2 w-full">
            <h3 className="text-[22px] font-bold text-secondary font-hind">
              {card.title}
            </h3>
            <p className="text-[18px] font-semibold text-gray-700 font-hind">
              {card.subtitle}
            </p>
            <ButtonStyle
              // onClick={handleEnrollNow}
              className="bg-primary text-white mt-2 px-4 py-2 rounded-md w-fit"
            >
              এখনই ভর্তি হোন
            </ButtonStyle>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WhyLearnCard;
