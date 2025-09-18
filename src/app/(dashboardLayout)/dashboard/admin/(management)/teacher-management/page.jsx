"use client";

import { useEffect, useState } from "react";
import { DateConversionWithTime } from "@/utils/DateConversionWithTime";
import TeacherModal from "@/components/AdminDashboard/TeacherManagement/TeacherModal";
import ViewDetails from "@/components/AdminDashboard/TeacherManagement/ViewDetails";
import { getTeachers, deleteTeacher } from "@/services/teacherService";
import { Button } from "@/components/UI/button";
import { Switch } from "@/components/UI/switch";
import { DataTable } from "@/components/UI/data-table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/UI/dialog"; // shadcn modal

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [viewTeacher, setViewTeacher] = useState(null); // for view modal

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
      accessorKey: "Edit",
      header: "Edit",
      cell: ({ row }) => (
        <Button onClick={() => setSelectedTeacher(row.original)}>
          Edit
        </Button>
      ),
    },
    {
      accessorKey: "View",
      header: "View",
      cell: ({ row }) => (
        <Button onClick={() => setViewTeacher(row.original)}>
          View
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
        <Button
          variant="destructive"
          onClick={() => handleDelete(row.original.email)}
        >
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

      {/* Edit Modal */}
      {selectedTeacher && (
        <TeacherModal
          teacher={selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
          onUpdated={() => setFetchAgain((prev) => !prev)}
        />
      )}

      {/* View Modal */}
      <Dialog open={!!viewTeacher} onOpenChange={() => setViewTeacher(null)}>
        <DialogContent className="min-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Teacher Details</DialogTitle>
          </DialogHeader>
          {viewTeacher && <ViewDetails userData={viewTeacher} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherManagement;
