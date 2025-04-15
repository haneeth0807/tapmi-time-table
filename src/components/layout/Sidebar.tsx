
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  GraduationCap,
  Home,
  MenuIcon,
  Users,
  X
} from "lucide-react";

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Courses",
      path: "/courses",
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      name: "Faculty",
      path: "/faculty",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Timetable",
      path: "/timetable",
      icon: <Calendar className="h-5 w-5" />,
    },
  ];

  return (
    <div
      className={cn(
        "relative flex flex-col h-screen bg-sidebar p-4 text-white transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[250px]",
        className
      )}
    >
      <div className="flex items-center justify-between mb-8">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <img 
              src="/tapmi-logo.svg" 
              alt="TAPMI" 
              className="h-8 w-8" 
              onError={(e) => {
                // Fallback if logo doesn't exist yet
                (e.target as HTMLImageElement).src = "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M9 18v-6'/%3e%3cpath d='m12 18 5-15'/%3e%3cpath d='M7 3h10'/%3e%3cpath d='M7 9h10'/%3e%3c/svg%3e";
              }}
            />
            <span className="font-bold text-xl">TimeWeaver</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-sidebar-accent" 
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <MenuIcon size={20} /> : <X size={20} />}
        </Button>
      </div>
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              location.pathname === item.path
                ? "bg-sidebar-accent text-white"
                : "text-white/80 hover:bg-sidebar-accent/50 hover:text-white"
            )}
          >
            {item.icon}
            {!collapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
}
