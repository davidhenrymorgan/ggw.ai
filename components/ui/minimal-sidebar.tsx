"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Sparkles,
  Image,
  Folder,
  Settings,
  HelpCircle,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Generate", href: "/dashboard/generate", icon: Sparkles },
  { name: "Explore", href: "/explore", icon: Image },
  { name: "Boards", href: "/dashboard/boards", icon: Folder },
];

const secondaryNavigation = [
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Help", href: "/dashboard/help", icon: HelpCircle },
];

export function MinimalSidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div className="fixed left-0 top-0 z-40 flex h-screen w-20 flex-col items-center border-r border-border/50 bg-background/80 py-6 backdrop-blur-xl">
      {/* Logo */}
      <Link
        href="/"
        className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-card-purple text-white font-bold text-lg"
      >
        G
      </Link>

      {/* Main Navigation */}
      <nav className="flex flex-1 flex-col items-center gap-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200",
                isActive
                  ? "bg-white/10 text-white shadow-glow"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
              title={item.name}
            >
              <Icon className="h-5 w-5" />

              {/* Tooltip */}
              <span className="absolute left-full ml-4 hidden rounded-lg bg-popover px-3 py-1.5 text-sm font-medium text-popover-foreground shadow-lg group-hover:block whitespace-nowrap">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Secondary Navigation */}
      <div className="flex flex-col items-center gap-2 border-t border-border/50 pt-4">
        {secondaryNavigation.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="group relative flex h-12 w-12 items-center justify-center rounded-xl text-muted-foreground transition-all duration-200 hover:bg-white/5 hover:text-foreground"
              title={item.name}
            >
              <Icon className="h-5 w-5" />

              {/* Tooltip */}
              <span className="absolute left-full ml-4 hidden rounded-lg bg-popover px-3 py-1.5 text-sm font-medium text-popover-foreground shadow-lg group-hover:block whitespace-nowrap">
                {item.name}
              </span>
            </Link>
          );
        })}

        {/* User Profile */}
        <Link
          href="/dashboard/profile"
          className="group relative mt-2 flex h-12 w-12 items-center justify-center"
          title="Profile"
        >
          <Avatar className="h-10 w-10 border-2 border-border/50 transition-all group-hover:border-border">
            <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
            <AvatarFallback className="bg-gradient-card-purple text-white font-semibold">
              {user?.firstName?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>

          {/* Tooltip */}
          <span className="absolute left-full ml-4 hidden rounded-lg bg-popover px-3 py-1.5 text-sm font-medium text-popover-foreground shadow-lg group-hover:block whitespace-nowrap">
            Profile
          </span>
        </Link>
      </div>
    </div>
  );
}
