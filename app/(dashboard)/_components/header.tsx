"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

const Header = () => {
  const { open, isMobile } = useSidebar();

  return (
    <header className="p-5 w-full sticky top-0 z-50 flex items-center">
      {isMobile || !open ? <SidebarTrigger /> : null}
    </header>
  );
};

export default Header;
