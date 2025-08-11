'use client';

import ClassRoomCard from "@/components/Shared/ClassRoomCard/ClassRoomCard";
import { getUserInfo } from "@/services/auth.services";
import { useEffect, useState } from "react";


const TeacherClassRoom = () => {
  const [classRooms, setClassRooms] = useState([]);

const [loading, setLoading] = useState(false);


  const user = getUserInfo();

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/classroom/teacher/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setClassRooms(data.data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      {/* {loading && <ProgressComponent open={loading} />} */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading && <p>Loading...</p>}
        {!loading && classRooms.map((element) => (
          <ClassRoomCard
            key={element._id}
            dashboard="teacherDashboard"
            element={element}
          />
        ))}
      </div>
    </div>
  );
};

export default TeacherClassRoom;
