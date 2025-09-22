"use client"

import React, { useEffect, useState, useCallback } from "react"
import axios from "axios"

import { DateConversionWithTime } from "@/utils/DateConversionWithTime"
import { DataTable } from "@/components/UI/data-table"
import AddLevelModalReg from "@/components/AdminDashboard/AdminCourse/RegistrationModal/AddLevelModalReg"
import { getUserInfo } from "@/services/auth.services"
import { columns } from "@/components/common/newColumn"


const Registration = () => {
  const [registrations, setRegistrations] = useState([])
  const [openLevel, setOpenLevel] = useState(false)
  const [openDete, setOpenDete] = useState(false)
  const [leveledEmail, setLeveledEmail] = useState(null)

  const user = getUserInfo()

  // ✅ Refetch function (used by columns)
  const fetchRegistrations = useCallback(() => {
    if (!user?.token) return

    const config = {
      headers: { authorization: `Bearer ${user.token}` },
    }

    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/registration`, config)
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : []
        setRegistrations(data)
      })
      .catch((err) => console.error(err))
  }, [user])

  // ✅ Run on mount & when modals close/open
  useEffect(() => {
    fetchRegistrations()
  }, [fetchRegistrations, openLevel, openDete])

  // ✅ Filter + Map data
  const filteredData = Array.isArray(registrations)
    ? registrations
        .filter((reg) => reg.regType === "trial-class")
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
    : []

  return (
    <div className="p-4 w-full">
      {/* ✅ now passing fetchRegistrations */}
      <DataTable columns={columns(fetchRegistrations)} data={filteredData} />
      <AddLevelModalReg
        open={openLevel}
        setOpen={setOpenLevel}
        email={leveledEmail}
      />
    </div>
  )
}

export default Registration
