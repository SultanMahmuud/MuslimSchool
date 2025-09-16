"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { columns } from "@/components/common/column"
import { DateConversionWithTime } from "@/utils/DateConversionWithTime"
import { DataTable } from "@/components/UI/data-table"
// import AddLevelModalReg from "@/components/AdminDashboard/AdminCourse/RegistrationModal/AddLevelModalReg"
import { getUserInfo } from "@/services/auth.services"
import { set } from "react-hook-form"
import AddLevelModalReg from "@/components/AdminDashboard/AdminCourse/RegistrationModal/AddLevelModalReg"

const Registration = () => {
  const [registrations, setRegistrations] = useState([])
  const [openLevel, setOpenLevel] = useState(false)
  const [openDete, setOpenDete] = useState(false)
  const [leveledEmail, setLeveledEmail] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const limit = 15
  const [loading, setLoading] = useState(false)

 const user = React.useMemo(() => getUserInfo(), [])

useEffect(() => {
  if (!user?.token) return

  const config = { headers: { authorization: `Bearer ${user.token}` } }
  setLoading(true)

  axios
    .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/all?limit=${limit}&page=${page}`, config)
    .then((res) => {
      setRegistrations(res.data.data || [])
      setTotalPages(res.data.pagination?.totalPages || 1)
    })
    .catch((err) => console.error(err))
    .finally(() => setLoading(false))
}, [user, page])




  const filteredData = registrations.map((user) => ({
    id: user._id,
    name: user?.name || "",
    email: user?.email || "",
    number: user?.number || "",
    parentName: user?.parentName || "",
    date: DateConversionWithTime(user?.updatedAt?.split?.("T")?.[0] || ""),
    address: user?.location || "",
    level: user?.levels?.level1 || "",
    age: user?.age || "",
    days: user?.attDays || "",
    time: user?.attTime || "",
    interestedSubject: user?.subject || "",
    openLevel: (email) => {
      setLeveledEmail(email)
      setOpenLevel(true)
    },
    setOpenDete,
  }))

  return (
    <div className="p-4 w-full">
      <DataTable
        columns={columns}
        data={filteredData}
        loading={loading}
      />

      <div className="flex justify-center mt-4 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Uncomment when ready */}
      {/* <AddLevelModalReg open={openLevel} setOpen={setOpenLevel} email={leveledEmail} /> */}
      <AddLevelModalReg open={openLevel} setOpen={setOpenLevel} email={leveledEmail} />
    </div>
  )
}

export default Registration
