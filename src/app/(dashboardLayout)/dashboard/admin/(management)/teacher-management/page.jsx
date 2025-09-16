"use client";

import { useEffect, useState } from "react";

// import { DataTable } from "@/components/UI/data-table";
import { DateConversionWithTime } from "@/utils/DateConversionWithTime";
import TeacherModal from "@/components/AdminDashboard/TeacherModal";
import { getTeachers, deleteTeacher } from "@/services/teacherService";
import { Button } from "@/components/UI/button";
import { Switch } from "@/components/UI/switch";
import { DataTable } from "@/components/UI/data-table";

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
console.log(teachers,'')
  useEffect(() => {
    getTeachers()
      .then((res) => setTeachers(res.data || []))
      .catch((err) => console.error("Error fetching teachers:", err));
  }, [fetchAgain]);

  const handleDelete = async (email) => {
    await deleteTeacher(email);
    setFetchAgain((prev) => !prev);
  };

  const columns = [
    {
      accessorKey: "view",
      header: "View/Edit",
      cell: ({ row }) => (
        <Button onClick={() => setSelectedTeacher(row.original)}>
          View/Edit
        </Button>
      ),
    },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "number", header: "Number" },
    { accessorKey: "teacherId", header: "ID" },
    { accessorKey: "Department", header: "Department" },
    { accessorKey: "joiningDate", header: "Join" },
    {
      accessorKey: "teacherOfTheMonth",
      header: "Teacher of the Month",
      cell: ({ row }) => (
        <Switch checked={row.original.teacherOfTheMonth} readOnly />
      ),
    },
    {
      accessorKey: "isBlock",
      header: "Block",
      cell: ({ row }) => (
        <Button
          variant={row.original.isBlock ? "destructive" : "outline"}
          onClick={() => console.log("Block toggle")}
        >
          {row.original.isBlock ? "Unblock" : "Block"}
        </Button>
      ),
    },
    {
      accessorKey: "delete",
      header: "Delete",
      cell: ({ row }) => (
        <Button variant="destructive" onClick={() => handleDelete(row.original.email)}>
          Delete
        </Button>
      ),
    },
  ];

  // Prepare data for table
  const tableData = teachers?.data?.map((t) => ({
    ...t,
    joiningDate: DateConversionWithTime(t.joiningDate),
  }));

  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={tableData} />
      {selectedTeacher && (
        <TeacherModal
          teacher={selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
          onUpdated={() => setFetchAgain((prev) => !prev)}
        />
      )}
    </div>
  );
};

export default TeacherManagement;
