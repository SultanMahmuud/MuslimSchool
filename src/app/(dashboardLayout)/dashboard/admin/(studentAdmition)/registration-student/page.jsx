"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { columns } from "@/components/common/column"
import { DateConversionWithTime } from "@/utils/DateConversionWithTime"
import { DataTable } from "@/components/UI/data-table"
import AddLevelModalReg from "@/components/AdminDashboard/AdminCourse/RegistrationModal/AddLevelModalReg"

const Registration = () => {
  const [registrations, setRegistrations] = useState([])
  const [openLevel, setOpenLevel] = useState(false)
  const [openDete, setOpenDete] = useState(false)
  const [leveledEmail, setLeveledEmail] = useState(null)
  const [user, setUser] = useState(null) // store user here

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (storedUser) setUser(JSON.parse(storedUser))
    }
  }, [])

  useEffect(() => {
    if (!user) return // don't fetch if no user

    const config = {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    }

    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/registration`, config)
      .then((res) => {
        setRegistrations(res.data.reverse())
      })
      .catch((err) => console.error(err))
  }, [user, openLevel, openDete])

  const filteredData = registrations
    ?.filter((reg) => reg.regType === "student-registration")
    .slice(0, 15)
    .map((user) => ({
      id: user._id,
      name: user?.user?.name || "",
      email: user?.user?.email || "",
      number: user?.phoneNumber || "",
      parentName: user?.parentName || "",
      date: DateConversionWithTime(user?.updatedAt?.split?.("T")?.[0] || ""),
      address: user?.address || "",
      level: user?.levels?.level1 || "",
      age: user?.age || "",
      days: user?.attDays || "",
      time: user?.attTime || "",
      interestedSubject: user?.interestedSubject || "",
      openLevel: (email) => {
        setLeveledEmail(email)
        setOpenLevel(true)
      },
      setOpenDete,
    }))

  return (
    <div className="p-4 w-full">
      <DataTable columns={columns} data={filteredData} />
      <AddLevelModalReg open={openLevel} setOpen={setOpenLevel} email={leveledEmail} />
    </div>
  )
}

export default Registration
