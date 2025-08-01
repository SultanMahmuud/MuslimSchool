'use client';

import ClassRoomCard from "@/components/Shared/ClassRoomCard/ClassRoomCard";
import { useEffect, useState } from "react";


import { BiSearch } from "react-icons/bi";

const AdminClassRoom = () => {
  const [classRoom, setClassRoom] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    setOpen(true);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/classRoom`)
      .then((res) => res.json())
      .then((data) => {
       
        setClassRoom(data.data);
        setSearchResult(data.data); // Update search result with fetched data
        setOpen(false);
      });
  }, []);

  const handleSearch = (e) => {
    const value = e?.target?.value;
    setSearchInput(value);

    const filtered = classRoom?.filter((cou) => {
      const lowerValue = value.toLowerCase();
      return (
        value !== "" &&
        (cou?.department?.toLowerCase().includes(lowerValue) ||
          cou?.subject?.toLowerCase().includes(lowerValue) ||
          cou?.roomNo?.toLowerCase().includes(lowerValue) ||
          cou?.medium?.toLowerCase().includes(lowerValue))
      );
    });

    setSearchResult(value === "" ? classRoom : filtered);
  };

  return (
    <div className="w-full px-4">
      {/* {open && <ProgressComponent open={open} />} */}

      <div className="flex items-center gap-2 p-2 bg-white rounded-md text-sm font-medium mb-4 shadow-sm">
        <BiSearch className="text-gray-500" />
        <input
          value={searchInput}
          onChange={handleSearch}
          type="text"
          placeholder="Enter search term"
          className="w-full h-9 px-2 text-sm bg-white rounded-sm outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {(searchResult?.length > 0 ? searchResult : classRoom)?.map((element) => (
          <ClassRoomCard
            key={element._id}
            element={element}
            dashboard="adminDashboard"
          />
        ))}
      </div>
    </div>
  );
};

export default AdminClassRoom;
