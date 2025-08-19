"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MenuIcon, XIcon, LogInIcon, CircleHelpIcon, CircleCheckIcon, CircleIcon
} from "lucide-react";
import { Button } from "@/components/UI/button";
import {
  Drawer, DrawerClose, DrawerContent, DrawerHeader
} from "@/components/UI/drawer";
import AuthComponent from "@/components/Authcomponent/Authcomponent";
import { getUserInfo } from "@/services/auth.services";
import RelativeMenu from "./RelativeMenu";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/slice/authSlice";
import { useRouter, usePathname } from "next/navigation";
import logo from "@/assets/Logo/Logo.png"; // Assuming you have a logo image
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";
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
  { label: "স্টুডেন্ট রিভিউ দেখুন", href: "/review" },
  { label: "লাইব্রেরি", href: "/show-library", },
  { label: "রিডিং কোরআন", href: "/reading-quran",  },
  { label: "অডিও কোরআন", href: "/audio-quran",},
];

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const user = getUserInfo();

  const [drawerOpen, setDrawerOpen] = useState(false); // login drawer
  const [mobileNavOpen, setMobileNavOpen] = useState(false); // left nav drawer

  const handleLogout = () => {
    dispatch(logout());
    router.refresh();
  };

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Desktop Navbar */}
      <div className="shadow-sm border-b bg-white sticky top-0 z-50 h-20">
 <header className="hidden md:flex w-7xl mx-auto px-4 py-3  justify-between items-center">
        {/* Left: Logo or Menu */}
        <div className="text-xl font-bold">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} width={130} height={100} alt="Logo" className="" />
          </Link>
        </div>
        {/* Center: Menu Items */}
        <nav className="flex gap-4">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-primary font-semibold text-md navColor">{item.label}</Link>
          ))}
          <DropdownMenu>
    <DropdownMenuTrigger className="font-semibold text-md navColor hover:text-primary">
      আরও
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-48">
      {tasksSubMenu.map((item) => (
        <DropdownMenuItem key={item.href} asChild>
          <Link
            href={item.href}
            className="flex items-center gap-2 hover:text-primary font-semibold text-md navColor"
          >
            {item.label}
          </Link>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
        </nav>
        {/* Right: Login / User Menu */}
        {user ? (
          <RelativeMenu user={user} handleLogout={handleLogout} />
        ) : (
          <button onClick={() => setDrawerOpen(true)} className="flex items-center gap-1">
            <LogInIcon className="h-5 w-5" /> লগইন
          </button>
        )}
      </header>

      </div>
     

      {/* Mobile Sticky Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b shadow-sm z-50 flex justify-between items-center px-4 py-2">
        <Button variant="ghost" onClick={() => setMobileNavOpen(true)}>
          <MenuIcon className="h-6 w-6" />
        </Button>
        {menuItems.slice(0,3).map((item) => (
          <Link key={item.href} href={item.href} className="block py-2 hover:text-primary font-semibold text-lg navColor">
            {item.label}
          </Link>
        ))}
       
      </div>

      {/* Mobile Left Drawer */}
     <Drawer open={mobileNavOpen} onOpenChange={setMobileNavOpen} direction="left">
  <DrawerContent className="p-4 w-64">
    <DrawerHeader>
      <DrawerClose className="absolute top-4 right-4">
        <XIcon className="h-5 w-5" />
      </DrawerClose>
      <h2 className="text-lg font-bold mb-4">Navigation</h2>
    </DrawerHeader>

    {/* ✅ Make drawer scrollable */}
    <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-80px)] pr-2">
      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block py-2 hover:text-primary"
        >
          {item.label}
        </Link>
      ))}

      <div className="pt-4 border-t">
        {tasksSubMenu.map((task) => (
          <Link
            key={task.href}
            href={task.href}
            className="flex items-center gap-2 py-2 hover:text-primary"
          >
             {task.label}
          </Link>
        ))}
      </div>

      <div className="pt-4 border-t">
        <button
          onClick={() => {
            setMobileNavOpen(false);
            setDrawerOpen(true);
          }}
          className="flex items-center gap-2 hover:text-primary"
        >
          <LogInIcon className="h-4 w-4" /> Login
        </button>
      </div>
    </div>
  </DrawerContent>
</Drawer>


      {/* Login Drawer (Right Side) */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="right">
        <DrawerContent className="p-4 max-w-sm">
          <DrawerHeader>
            <DrawerClose className="absolute top-4 right-4">
              <XIcon className="h-5 w-5" />
            </DrawerClose>
          </DrawerHeader>
          <AuthComponent />
        </DrawerContent>
      </Drawer>
    </>
  );
}
