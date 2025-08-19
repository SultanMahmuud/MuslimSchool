
// import Instructureteacher from "@/components/Instructureteacher";

import Instructureteacher from "@/components/AllPages/TeacherPage/Instructureteacher/Instructureteacher";

export default async function Page({ params }) {

  const { teacherId } = await params;
  const res = await fetch(`https://muslim-schoool.onrender.com/user/single-home/${teacherId}`, {
    cache: "no-store",
  });
  const teacherProfiles = await res.json();

console.log(teacherProfiles)
  return (
    <Instructureteacher teacherProfiles={teacherProfiles?.data} />
 
  )
}
