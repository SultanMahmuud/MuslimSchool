"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MenuIcon,
  XIcon,
  BellIcon,
  LogInIcon,
  CircleHelpIcon,
  CircleCheckIcon,
  CircleIcon,
  UserIcon,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/UI/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";

import { Button } from "@/components/UI/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/UI/drawer";
import AuthComponent from "@/components/Authcomponent/Authcomponent";
import { getUserInfo } from "@/services/auth.services";
import RelativeMenu from "./RelativeMenu";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/slice/authSlice";
import { useRouter } from "next/navigation";

const menuItems = [
  { label: "আমাদের সম্পর্কে", href: "/about" },
  { label: "কোর্স", href: "/courses" },
  { label: "লাইভ ব্যাচ", href: "/live-batch" },
  { label: "প্রাইসিং", href: "/pricing" },
  { label: "টিচার", href: "/teacher" },
  { label: "ভর্তি ফর্ম", href: "/student-registration" },
  { label: "ফ্রি ক্লাস", href: "/trial-class" },
  { label: "যোগাযোগ", href: "/contact" },
  { label: "প্রশ্নোত্তর", href: "/frequently-asked-questions" },
];

const tasksSubMenu = [
  {
    label: "স্টুডেন্ট রিভিউ দেখুন",
    href: "/review",
    icon: <CircleHelpIcon className="h-4 w-4" />,
  },
  {
    label: "লাইব্রেরি",
    href: "/show-library",
    icon: <CircleIcon className="h-4 w-4" />,
  },
  {
    label: "রিডিং কোরআন",
    href: "/reading-quran",
    icon: <CircleCheckIcon className="h-4 w-4" />,
  },
  {
    label: "অডিও কোরআন",
    href: "/audio-quran",
    icon: <CircleCheckIcon className="h-4 w-4" />,
  },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // <-- updated
const router = useRouter();
  const user = getUserInfo();

  const handleLogout = () => {
    // Implement logout functionality
    dispatch(logout());
     router.refresh();
  };

  return (
    <>
      <header className="w-full px-4 py-3 shadow-sm border-b bg-white dark:bg-black sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="text-3xl font-extrabold text-primary">
            <Link href="/">MyLogo</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-center">
            <NavigationMenu>
              <NavigationMenuList className="">
                {menuItems.map((item, idx) => (
                  <NavigationMenuItem key={idx}>
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle() }
                    >
                      <Link href={item.href} className="font-semibold navColor text-[16px] hover:navColor">
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Link href="#" className="font-semibold navColor text-lg">
                      আরও
                    </Link>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40">
                    <DropdownMenuRadioGroup onValueChange={() => {}}>
                      {tasksSubMenu.map((task, idx) => (
                        <DropdownMenuRadioItem
                          key={idx}
                          value={task.label}
                          className="flex items-left gap-4"
                        >
                          <Link
                            href={task.href}
                            className="font-semibold navColor text-base"
                          >
                            {task.label}
                          </Link>
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right actions */}
<div className="flex items-center gap-4">
  <div className="hidden md:flex items-center gap-4">
    {user ? (
      <RelativeMenu user={user} handleLogout={handleLogout} />
    ) : (
      <button
        onClick={() => setDrawerOpen(true)}
        className="flex items-center gap-1  font-medium hover:text-primary transition-colors"
      >
        <LogInIcon className="h-5 w-5" />
        লগইন
      </button>
    )}




             
            </div>

            {/* Hamburger Menu */}
            <Button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden"
            >
              {mobileOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden mt-3 space-y-2 px-4 pb-4">
            {menuItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="block py-2 font-medium text-base hover:text-primary"
              >
                {item.label}
              </Link>
            ))}

            <div className="border-t pt-3">
              <p className="font-semibold text-sm mb-2">Tasks</p>
              {tasksSubMenu.map((task, idx) => (
                <Link
                  key={idx}
                  href={task?.href}
                  className="flex items-center gap-2 py-1 text-sm hover:text-primary"
                >
                  {task?.icon}
                  {task?.label}
                </Link>
              ))}
            </div>

            <div className="border-t pt-3">
              <button
                onClick={() => setDrawerOpen(true)}
                className="flex items-center gap-2 text-sm py-2 hover:text-primary"
              >
                <LogInIcon className="h-4 w-4" />
                Login
              </button>
              
            </div>
          </div>
        )}
      </header>

      {/* Right Drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="right" className="">
        <DrawerContent className="p-4  mx-auto  min-w-lg">
          <DrawerHeader>
          
            <DrawerClose className="absolute top-4 right-4">
              <XIcon className="h-5 w-5" />
            </DrawerClose>
          </DrawerHeader>
          
           <AuthComponent/>
     
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
