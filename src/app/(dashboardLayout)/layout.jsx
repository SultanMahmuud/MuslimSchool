'use client'
import { AppSidebar } from "@/components/app-sidebar"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/UI/sidebar"


const  Dashboard= ({ children }) =>{

  // if (!isLoggedIn()) {
  //     return <p>You are not logged in</p>
  //  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
    
      <div className="w-full">
       

        <div className="bg-[#F5F5F5] h-auto min-h-[100vh] p-5">{children}</div>
      </div>
       
      </SidebarInset>
    </SidebarProvider>
  )
}
export default Dashboard