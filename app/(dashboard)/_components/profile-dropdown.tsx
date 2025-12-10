"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@/hooks/use-user";

export default function ProfileDropdown() {
  const { user } = useUser();
  if (!user) return null;

  const email = user.email ?? "";

  // Avatar initial
  const firstLetter = (
    user.user_metadata?.username?.[0] ||
    email[0] ||
    "?"
  ).toUpperCase();

  // Display name logic:
  // 1. use username if present
  // 2. fallback to email before "@"
  const displayName =
    user.user_metadata?.username?.trim() || email.split("@")[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="cursor-pointer">
          <AvatarFallback className="bg-gray-600 text-white text-xl p-1.5">
            {firstLetter}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 mr-5 bg-background">
        <DropdownMenuLabel className="flex flex-col">
          <span className="font-medium capitalize">{displayName}</span>
          <span className="text-sm text-muted-foreground mt-1">{email}</span>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
