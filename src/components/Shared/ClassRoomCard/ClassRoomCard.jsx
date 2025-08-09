'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';


const ClassRoomCard = ({ dashboard, element }) => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    axios
      .put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/getByFiltered`, {
        emails: element?.assignedTeacher,
      })
      .then((res) => {
        setTeachers(res?.data.data);
      })
      .catch((error) => {});
  }, [element]);

  return (
    <div className="w-full p-2">
      <Link
        href={`/${dashboard}/classRoom/${element?._id}`}
        className="block bg-white rounded shadow-sm hover:-translate-y-2 transition-transform duration-300"
      >
        <div className="flex flex-col items-center justify-center py-3 px-2">
          <h2 className="text-primary font-semibold text-lg text-center">
            {element?.department}
          </h2>
          <p className="text-sm text-gray-500 text-center">
            {element?.slogan?.slice(0, 30)}
          </p>
        </div>

        <Image
        
          src={element?.image}
          alt="classroom"
          width={400}
          height={250}
          className="w-full h-40 object-cover"
        />

        <div className="p-3">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <p>+{element?.accessedStudent?.length}</p>
            <p>Room No: {element?.roomNo}</p>
          </div>

          {/* Teacher List */}
          {teachers?.map((teacher, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-gray-100 rounded p-1.5 my-1 shadow-sm"
            >
              <Image
                src={teacher?.avatar}
                alt={teacher?.name}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
              />
              <p className="text-sm text-gray-700">
                <strong>Teacher:</strong> {teacher?.name}
              </p>
            </div>
          ))}

          <hr className="my-2" />

          {/* Subjects */}
          <div className="bg-gray-50 p-2 rounded text-sm">
            <div className="flex gap-1">
              <strong>Subject:</strong>
            </div>
            <div className="mt-1 space-y-1">
              {element?.subject?.split(',').map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ClassRoomCard;
