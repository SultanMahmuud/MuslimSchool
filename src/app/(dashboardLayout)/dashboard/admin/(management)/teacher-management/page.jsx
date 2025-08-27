"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/UI/switch";
import { Button } from "@/components/UI/button";
import { DataTable } from "@/components/UI/data-table";
import { DateConversionWithTime } from "@/utils/DateConversionWithTime";
import axios from "axios";
import SendMessage from "@/components/common/SendMessage";

const TeacherManagement = () => {
  const [teacherEmail, setTeacherEmail] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [email, setEmail] = useState(null);
  const [paymentModal, setPaymentModal] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);

  // ✅ Fetch teachers (only runs on mount or when fetchAgain changes)
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/role/teacher`)
      .then((res) => {
        setRegistrations(res.data);
      })
      .catch((err) => console.error("Error fetching teachers:", err));
  }, [fetchAgain]);

  // ✅ Delete teacher
  const deleteTeacher = async (email) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/delete/${email}`);
      // trigger re-fetch
      setFetchAgain((prev) => !prev);
    } catch (err) {
      console.error("Error deleting teacher:", err);
    }
  };

  const paymentHandler = (email) => {
    setEmail(email);
    setPaymentModal(true);
  };

  const handleTeacherOfTheMonth = async (checked, email) => {
    // Here you can call API to update teacherOfTheMonth
    // await axios.patch(`${API_URL}/teacher-of-month`, { email, teacherOfTheMonth: checked });
    setFetchAgain((prev) => !prev);
  };

  const handleBlock = async (isBlocked, email) => {
    // Here you can call API to update block/unblock
    // await axios.patch(`${API_URL}/block`, { email, isBlock: !isBlocked });
    setFetchAgain((prev) => !prev);
  };

  // ✅ Table columns
  const columns = [
    {
      accessorKey: "view",
      header: "View All",
      cell: ({ row }) => (
        <Button
          variant="outline"
          className="text-xs rounded-xl shadow"
          onClick={() => setTeacherEmail(row.original.email)}
        >
          View
        </Button>
      ),
    },
    { accessorKey: "name", header: "Teacher Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "number", header: "Number" },
    { accessorKey: "teacherId", header: "ID" },
    { accessorKey: "Department", header: "Department" },
    { accessorKey: "joiningDate", header: "Join" },
    {
      accessorKey: "teacherOfTheMonth",
      header: "Teacher of the Month",
      cell: ({ row }) => (
        <Switch
          checked={row.original.teacherOfTheMonth}
          onCheckedChange={(checked) =>
            handleTeacherOfTheMonth(checked, row.original.email)
          }
          className="data-[state=checked]:bg-yellow-500"
        />
      ),
    },
    {
      accessorKey: "payment",
      header: "Payment",
      cell: ({ row }) => (
        <Button
          variant="outline"
          className="text-xs rounded-xl shadow"
          onClick={() => paymentHandler(row.original.email)}
        >
          Payment
        </Button>
      ),
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: ({ row }) => (
        <SendMessage
          data={{
            email: row.original.email,
            number: row.original.number,
          }}
        />
      ),
    },
    {
      accessorKey: "isBlock",
      header: "Block",
      cell: ({ row }) => {
        const isBlocked = row.original.isBlock;
        return (
          <Button
            variant="outline"
            className={`text-xs rounded-xl shadow ${
              isBlocked ? "bg-yellow-400 text-black" : ""
            }`}
            onClick={() => handleBlock(isBlocked, row.original.email)}
          >
            {isBlocked ? "Unblock" : "Block"}
          </Button>
        );
      },
    },
    {
      accessorKey: "delete",
      header: "Delete",
      cell: ({ row }) => (
        <Button
          variant="outline"
          className="text-xs rounded-xl shadow"
          onClick={() => deleteTeacher(row.original.email)}
        >
          Delete
        </Button>
      ),
    },
  ];

  // ✅ Prepare teacher data
  const teacherData =
    registrations?.data?.map((user) => ({
      name: user?.name || "",
      email: user?.email || "",
      number: user?.number || "",
      teacherId: user?.teacherId || "",
      Department: user?.Department || "",
      joiningDate: DateConversionWithTime(user?.joiningDate),
      teacherOfTheMonth: user?.teacherOfTheMonth || false,
      isBlock: user?.isBlock || false,
    })) || [];

  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={teacherData} />
    </div>
  );
};

export default TeacherManagement;
