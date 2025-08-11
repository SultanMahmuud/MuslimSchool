"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const LeaderBoard = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [student, setStudent] = useState([]);

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const placeholderImage =
    "https://upload.wikimedia.org/wikipedia/commons/f/fc/Qur%27an_and_Rehal.jpg";

  useEffect(() => {
    fetch(`${BASE_URL}/user/role/student`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data?.data
          ?.map((e) => ({
            name: e.name,
            points: e.points ?? 0,
            attend: e.questionMarks?.length ?? 0,
            email: e.email,
            avatar: e.avatar || "",
            address: e.address || "No address provided",
          }))
          .sort((a, b) => b.points - a.points);
        setStudent(sorted || []);
      });
  }, [BASE_URL]);

  return (
    <div className="flex flex-col items-center justify-center w-full px-4">
      {/* Leader */}
      {student?.[0] && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Leader Board</h2>
          <Image
          
            src={student[0].avatar || placeholderImage}
            alt="avatar"
            className="w-24 h-24 rounded-full mx-auto mt-4 object-cover border border-gray-300"
            width={96}
            height={96}
          />
          <h3 className="mt-2 text-lg font-semibold">{student[0].name}</h3>
          <p className="text-sm text-gray-500">{student[0].address}</p>
          <p className="text-primary font-semibold text-md">{student[0].points} Points</p>
        </div>
      )}

      {/* Others */}
      <div className="w-full max-w-2xl">
        {student?.map((e, index) => (
          <div
            key={index}
            className={`flex items-center justify-between gap-4 p-3 mb-2 rounded shadow-md bg-white ${
              selectedIndex === index ? "bg-gray-100" : ""
            }`}
            onClick={() => setSelectedIndex(index)}
          >
            <div className="flex items-center gap-3">
              <Image
                src={e.avatar || placeholderImage}
                alt={e.name}
                className="w-12 h-12 rounded-full object-cover border"
                width={48}
                height={48}
              />
              <div>
                <p className="font-semibold text-sm">{e.name}</p>
                {/* <p className="text-xs text-gray-500">{e.email}</p> */}
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium">{e.points} Points</p>
              <p className="text-xs text-gray-500">{index + 1}th</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
