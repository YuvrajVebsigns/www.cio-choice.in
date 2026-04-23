import type { NavItem } from "@/types";

export const SIDEBAR_NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Users", href: "/users", icon: "Users" },
  { label: "Media", href: "/media", icon: "Film" },
  { label: "Content", href: "/content", icon: "FileText" },
  { label: "Analytics", href: "/analytics", icon: "BarChart3" },
  { label: "Settings", href: "/settings", icon: "Settings" },
];

export const SIDEBAR_BOTTOM_ITEMS: NavItem[] = [
  { label: "Help & Support", href: "/support", icon: "HelpCircle" },
];
