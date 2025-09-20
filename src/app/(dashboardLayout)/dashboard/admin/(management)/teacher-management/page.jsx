"use client";

import { useEffect, useState } from "react";
import { DateConversionWithTime } from "@/utils/DateConversionWithTime";
import TeacherModal from "@/components/AdminDashboard/TeacherManagement/TeacherModal";
import ViewDetails from "@/components/AdminDashboard/TeacherManagement/ViewDetails";
import { getTeachers, deleteTeacher, updateTeacher } from "@/services/teacherService";
import { Button } from "@/components/UI/button";
import { Switch } from "@/components/UI/switch";
import { DataTable } from "@/components/UI/data-table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/UI/dialog"; // shadcn modal

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]); // always an array
  const [fetchAgain, setFetchAgain] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [viewTeacher, setViewTeacher] = useState(null); // for view modal
console.log(teachers)
  useEffect(() => {
    getTeachers()
      .then((res) => setTeachers(res.data || [])) // ensure array
      .catch((err) => console.error("Error fetching teachers:", err));
  }, [fetchAgain]);

  const handleDelete = async (email) => {
    try {
      await deleteTeacher(email);
      setTeachers(prev => prev.filter(t => t.email !== email)); // remove deleted teacher from table
      alert("Teacher deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Error deleting teacher");
    }
  };

  const handleToggleBlock = async (teacher) => {
    try {
      await updateTeacher({
        email: teacher.email,
        isBlock: !teacher.isBlock
      });

      // Update table immediately
      

    alert(`Teacher ${teacher.name} is now ${teacher.isBlock ? "unblocked" : "blocked"}`);
      
 window.location.reload();
  
    } catch (err) {
      console.error("Failed to update teacher:", err);
      alert("Error updating teacher. Please try again.");
    }
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
      cell: ({ row }) => <Switch checked={row.original.teacherOfTheMonth} readOnly />,
    },
    {
      accessorKey: "isBlock",
      header: "Block",
      cell: ({ row }) => (
        <Button
          variant={row.original.isBlock ? "destructive" : "outline"}
          onClick={() => handleToggleBlock(row.original)}
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
          onUpdated={() => setFetchAgain(prev => !prev)}
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
