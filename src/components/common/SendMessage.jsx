"use client"

import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu"
import {
  Dialog,

} from "@/components/UI/dialog"

import RegistrationAllSendSms from "./RegistrationAllSendSms"

const SendMessage = ({ data }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
            Send Message
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-64 p-2">
          <DropdownMenuItem onSelect={() => setOpen(true)}>
            <span className="w-full">Open SMS Dialog</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setOpen(true)}>
            <span className="w-full">Open Mail</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog rendered outside of dropdown */}
      <Dialog open={open} onOpenChange={setOpen}>
      <RegistrationAllSendSms row={{phoneNumber:data.number}} email={data.email}/>
      </Dialog>
    </>
  )
}

export default SendMessage
