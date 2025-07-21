"use client";

import * as React from "react";
import {
  BarChart,
  Book,
  BookOpen,
  Bot,
  Frame,
  LogOut,
  Map,
  PieChart,
  SearchCode,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/UI/sidebar";
import { getUserInfo } from "@/services/auth.services";
import { BsPeople } from "react-icons/bs";
import { PiStudent } from "react-icons/pi";
import { MdLeaderboard, MdPayment } from "react-icons/md";
import { BiCategory, BiComment } from "react-icons/bi";
import { FaQq, FaQuestion } from "react-icons/fa";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

// adjust path as needed

const baseData = {
  user: {
    name: "Name",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/admin/adminDashboard",
      icon: SquareTerminal,
      isActive: true,
      roles: ["admin", "teacher"], // only shown to these roles
    },
    {
      title: "Course",
      url: "/dashboard/admin/course",
      icon: Bot,
      roles: ["admin"],
      items: [
        { title: "Create New", url: "/dashboard/admin/course/add-course" },
        { title: "Draft Course", url: "#" },
      ],
    },
    {
      title: "Class Room",
      url: "#",
      icon: Book,
      roles: ["admin"],
      items: [
        { title: "Create New", url: "#" },
        { title: "Edit", url: "#" },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: BarChart,
      roles: ["admin"],
    },
    {
      title: "Team Hire",
      url: "#",
      icon: BsPeople,
      roles: ["admin"],
    },
    {
      title: "Student Admition",
      url: "#",
      icon: PiStudent,
      roles: ["admin"],
      items: [
        { title: "Student Create", url: "#" },
        { title: "Call request", url: "#" },
        { title: "Contact us", url: "#" },
        { title: "Student Registration", url: "#" },
        { title: "Trail class Registration", url: "#" },
        { title: "Current  Registration", url: "#" },
        { title: "Current Student Delete", url: "#" },
      ],
    },
  
    {
      title: "Payment",
      url: "#",
      icon: MdPayment,
      roles: ["admin"],
      items: [
        { title: "Student Payment", url: "#" },
        { title: "Teacher Payment", url: "#" },
        { title: "All Payment ", url: "#" },
        { title: "Student Monthly pay", url: "#" },
      ],
    },
    {
      title: "Management",
      url: "#",
      icon: SearchCode,
      roles: ["admin"],
      items: [
        { title: "Content", url: "#" },
        { title: "Admin Setting", url: "#" },
        { title: "Student Management ", url: "#" },
        { title: "Teacher Management", url: "#" },
        { title: "Message", url: "#" },
        { title: "Add Teacher", url: "#" },
      ],
    },
    {
      title: "Add Review",
      url: "#",
      icon: BiComment,
      roles: ["admin"],
      items: [
        { title: "Create Review", url: "#" },
      
      ],
    },
    {
      title: "F.A Question",
      url: "#",
      icon: FaQuestion,
      roles: ["admin"],
      items: [
        { title: "Create FAQ", url: "#" },
      
      ],
    },
    {
      title: "Category",
      url: "#",
      icon: BiCategory,
      roles: ["admin"],
      items: [
        { title: "Course", url: "#" },
        { title: "Batch", url: "#" },
        { title: "Library", url: "#" },
        { title: "Blog", url: "#" },
        { title: "Faq", url: "#" },
      
      ],
    },
    {
      title: "Leader Board",
      url: "#",
      icon: MdLeaderboard,
      roles: ["admin"],
      
    },

    // 
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   roles: ["admin"],
    //   items: [
    //     { title: "General", url: "#" },
    //     { title: "Team", url: "#" },
    //     { title: "Billing", url: "#" },
    //     { title: "Limits", url: "#" },
    //   ],
    // },
  ],
  
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const user = getUserInfo();

  const filteredNav = React.useMemo(() => {
    if (!user?.role) return [];

    return baseData.navMain.filter((item) => item.roles?.includes(user.role));
  }, [user]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>Muslim School</SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNav} />
        {/* <NavProjects projects={baseData.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
         
              <LogOut />
           
         
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
