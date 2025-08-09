import React, { useEffect, useState } from "react";


const WhatLearn = ({data}) => {

const array = data.whatLearn
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-5">
      {array?.map((show, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row items-center gap-0 sm:gap-2 p-3 sm:p-4 lg:p-2 rounded-md shadow hover:shadow z-10 transition-shadow duration-500 h-[173px] lg:h-auto"
        >
          <img
            src={show.uploadUrl}
            alt="Banner"
            className="w-12 h-12 rounded bg-[#f9f9fa] p-[6px]"
          />
          <div className="text-center sm:text-left">
         
            <p className="base1 text-[18px] sm:text-[16px] md:text-[18px] lg:text-[18px]">
              {show.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WhatLearn;
