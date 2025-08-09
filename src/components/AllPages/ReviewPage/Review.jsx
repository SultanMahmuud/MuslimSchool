'use client';
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Review() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const stylePresets = [
    { border: "from-green-400 via-blue-500 to-purple-500" },
    { border: "from-pink-500 via-purple-500 to-blue-500" },
    { border: "from-purple-500 via-blue-400 to-pink-400" },
    { border: "from-blue-400 via-purple-400 to-yellow-400" },
    { border: "from-yellow-400 via-orange-400 to-pink-500" },
    { border: "from-green-400 via-yellow-500 to-red-400" },
    { border: "from-purple-400 via-blue-500 to-green-400" },
    { border: "from-pink-400 via-red-400 to-yellow-400" },
  ];

  useEffect(() => {
    const getComponent = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          "https://muslim-schoool.onrender.com/api/v1/reviews/getReview"
        );

        const styledData = res.data.map((review, index) => {
          const style = stylePresets[index % stylePresets.length];
          return { ...review, ...style };
        });

        setReviews(styledData);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getComponent();
  }, []);

  return (
    <div className="py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold ">
          Testimonials
        </h2>
        <p className="text-base sm:text-lg font-semibold mt-2 tracking-wide">
          “What Students & Parents Are Saying About Us”
        </p>
        <p className="text-sm sm:text-base font-semibold mt-2 tracking-wide">
          We take every feedback of students and parents very seriously.
          Accordingly, we strive to improve <br className="hidden sm:block" />
          our operations more and more. You can also share your opinion about us
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 max-w-7xl mx-auto">
        {reviews.map((t, i) => (
          <div
            key={i}
            className={`relative p-[1px] rounded-2xl bg-gradient-to-br ${t.border} transition-transform hover:scale-105`}
          >
            <div className="bg-gradient-to-br from-[#19122B] to-[#0F1021] backdrop-blur-lg rounded-xl h-full flex flex-col justify-between p-7 font-hind">
              <div
                className={`absolute -top-6 left-7 bg-gradient-to-r ${t.border} text-white rounded-full w-10 h-10 flex items-center justify-center text-3xl shadow-lg`}
              >
                &ldquo;
              </div>
              <p className="text-white/90 text-[1.08rem] leading-relaxed mb-6 flex-grow font-hind">
                {t.review}
              </p>
              <div className="flex items-center gap-4 mt-4">
                <Image
                  src={t.reviewPersonImg}
                  alt={t.personName}
                  className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                />
                <div>
                  <div className="font-bold text-white">{t.personName}</div>
                  <div className="text-white/70 text-sm">
                    {t.location} &bull; {t.date}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
