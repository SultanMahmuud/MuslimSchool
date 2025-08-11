'use client'

import { useEffect, useState } from 'react'
// import {useSelector } from 'react-redux'
import { Switch } from '@/components/UI/switch'
import { Button } from '@/components/UI/button'


import { DataTable } from '@/components/UI/data-table'
import { DateConversionWithTime } from '@/utils/DateConversionWithTime'
import axios from 'axios'
import SendMessage from '@/components/common/SendMessage'

// import TeacherPaymentModal from './TeacherPaymentModal'
// import TeachersStudent from './TeachersStudent'

const TeacherManagement = () => {
  const [teacherEmail, SetTeacherEmail] = useState()
  const [registrations, setRegistrations] = useState()
  // const { roleUsers, message } = useSelector(state => state.qawmiauth)

  const [email, setEmail] = useState()
  const [paymentModal, setPaymentModal] = useState(false)
  const [fetchAgain, setFetchAgain] = useState(false)

  useEffect(() => {
    // dispatch(getUserByRole({ role: 'teacher' }))
  }, [email, fetchAgain])

   axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/role/teacher`)
      .then((res) => {
       
        setRegistrations(res.data)
      })
      .catch((err) => console.error(err))
  

  const deleteTeacher = (email) => {
    setEmail(email)
    // dispatch(deleteUser({ email }))
    // dispatch(getUserByRole({ role: 'teacher' }))
  }

  const paymentHandler = (email) => {
    setEmail(email)
    setPaymentModal(true)
  }

  const handleTeacherOfTheMonth = (checked, email) => {
    // dispatch(Profileupdate({ email, teacherOfTheMonth: checked }))
    setFetchAgain(!fetchAgain)
  }

  const handleBlock = (isBlocked, email) => {
    // dispatch(Profileupdate({ email, isBlock: !isBlocked }))
    setFetchAgain(!fetchAgain)
  }

  const columns = [
    {
      accessorKey: "view",
      header: "View All",
      cell: ({ row }) => (
        <Button
          variant="outline"
          className="text-xs rounded-xl shadow"
          onClick={() => SetTeacherEmail(row.original.email)}
        >
          View
        </Button>
      )
    },
    {
      accessorKey: "name",
      header: "Teacher Name"
    },
    {
      accessorKey: "email",
      header: "Email"
    },
    {
      accessorKey: "number",
      header: "Number"
    },
    {
      accessorKey: "teacherId",
      header: "ID"
    },
    {
      accessorKey: "Department",
      header: "Department"
    },
    {
      accessorKey: "joiningDate",
      header: "Join"
    },
    {
      accessorKey: "teacherOfTheMonth",
      header: "Teacher of the Month",
      cell: ({ row }) => (
        <Switch
          checked={row.original.teacherOfTheMonth}
          onCheckedChange={(checked) => handleTeacherOfTheMonth(checked, row.original.email)}
          className="data-[state=checked]:bg-yellow-500"
        />
      )
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
      )
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: ({ row }) => (
        <SendMessage
          data={{
            email: row.original.email,
            number: row.original.number
          }}
        />
      )
    },
    {
      accessorKey: "isBlock",
      header: "Block",
      cell: ({ row }) => {
        const isBlocked = row.original.isBlock
        return (
          <Button
            variant="outline"
            className={`text-xs rounded-xl shadow ${isBlocked ? 'bg-yellow-400 text-black' : ''}`}
            onClick={() => handleBlock(isBlocked, row.original.email)}
          >
            {isBlocked ? "Unblock" : "Block"}
          </Button>
        )
      }
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
      )
    }
  ]

  const teacherData = registrations?.data.map(user => ({
    name: user?.name || '',
    email: user?.email || '',
    number: user?.number || '',
    teacherId: user?.teacherId || '',
    Department: user?.Department || '',
    joiningDate: DateConversionWithTime(user?.joiningDate),
    teacherOfTheMonth: user?.teacherOfTheMonth || false,
    isBlock: user?.isBlock || false
  }))

  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={teacherData || []} />
      {/* <TeacherPaymentModal
        open={paymentModal}
        setOpen={setPaymentModal}
        email={email}
      />
      {teacherEmail && (
        <div>
          <TeachersStudent email={teacherEmail} />
        </div>
      )} */}
    </div>
  )
}

export default TeacherManagement
