'use client';
import { useState } from "react";

const pages = [
  "কোরআন শিক্ষা",
  "হিফজ",
  "নাজেরা",
  "হাদিস",
  "তাফসীর"
];

const FamousBar = () => {
  const [activePage, setActivePage] = useState("");

  return (
    <div className="flex items-center px-4 md:px-6 lg:px-8">
      <div className="flex gap-2 md:flex lg:flex  flex-grow">
        {pages.map((page) => (
          <div
            key={page}
            onClick={() => setActivePage(page)}
            className={`hind px-3 py-2 rounded-md font-semibold text-[16px] cursor-pointer transition-all duration-300 ${
              activePage === page
                ? "bg-white shadow-lg"
                : "bg-[#EFF3F1] hover:bg-white"
            }`}
          >
            {page}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FamousBar;
