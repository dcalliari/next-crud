import type { NavItem } from "@/types";
import { BookOpenCheck, LayoutDashboard } from "lucide-react";

export const NavItems: NavItem[] = [
	{
		title: "Dashboard",
		icon: LayoutDashboard,
		href: "/",
		color: "text-sky-500",
	},
	{
		title: "Employees",
		icon: BookOpenCheck,
		href: "/employees",
		color: "text-orange-500",
	},
	{
		title: "Benefit Cards",
		icon: BookOpenCheck,
		href: "/cards",
		color: "text-orange-500",
	},
];
