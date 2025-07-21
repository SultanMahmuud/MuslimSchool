'use client'
import { AppSidebar } from "@/components/app-sidebar"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/UI/sidebar"
// import { isLoggedIn } from "@/services/auth.services";
import AppBar  from '@/components/common/Appbar'

const  Dashboard= ({ children }) =>{

  // if (!isLoggedIn()) {
  //     return <p>You are not logged in</p>
  //  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
    
      <div className="w-full">
        <AppBar />

        <div className="bg-[#F5F5F5] h-auto min-h-[100vh]">{children}</div>
      </div>
       
      </SidebarInset>
    </SidebarProvider>
  )
}
export default Dashboard