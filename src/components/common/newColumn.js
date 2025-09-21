"use client";


import { Button } from "../UI/button";
// import SendMessage from "./SendMessage";
import axios from "axios";
import SendMessage from "./SendMessage";



export const newColumn = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "number", header: "Number" },
  { accessorKey: "parentName", header: "Parent Name" },

  { accessorKey: "address", header: "Address" },
  { accessorKey: "level", header: "Level" },
  { accessorKey: "age", header: "Age" },
  { accessorKey: "days", header: "Days" },
  { accessorKey: "time", header: "Time" },
  { accessorKey: "interestedSubject", header: "Interested Subject" },
  {
    id: "addLevel",
    header: "Add Level",
    cell: ({ row }) => {
      const email = row.original.email;
      const open = row.original.openLevel; // passed manually in row object

      return (
        <Button
          variant="outline"
          className="text-xs py-1 px-2 rounded-full"
          onClick={() => open(email)}
        >
          Add Level
        </Button>
      );
    },
  },
  {
    id: "message",
    header: "Message",
    cell: ({ row }) => (
      <SendMessage
        data={{ email: row.original.email, number: row.original.number }}
      />
    ),
  },
  {
    id: "delete",
    header: "Delete",
    cell: ({ row }) => {
    
      const handleDelete = async () => {
        try {
          const id = row.original.id
          
          await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/registration/delete/${id}`)
          alert("Deleted successfully")
          // Optional: trigger a refetch or update table state here if needed
          // do here
          setRegistrations((prev) => prev.filter((item) => item.id !== id))



        } catch (error) {
          toast.error("Error deleting registration")
        }
      }

      return (
        <Button
          variant="destructive"
          size="sm"
          className="text-xs"
          onClick={handleDelete}
        >
          Delete
        </Button>
      )
    },
  },
];