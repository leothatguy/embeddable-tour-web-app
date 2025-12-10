"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import ProfileDropdown from "./profile-dropdown";

const Header = () => {
  const { open, isMobile } = useSidebar();

  return (
    <header className="p-5 w-full sticky top-0 z-50 flex items-center justify-between bg-background backdrop-blur border-b shadow-2xl">
      {/* Left: Sidebar Trigger */}
      <div>{isMobile || !open ? <SidebarTrigger /> : null}</div>

      {/* Right: User Profile */}
      <ProfileDropdown />
    </header>
  );
};

export default Header;
