"use client";

import { Checkbox } from "@/components/ui/checkbox";
import type { CardColumn } from "@/lib/validators";
import type { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<CardColumn>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="translate-y-[2px]"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "cardNumber",
		header: "Card Number",
	},
	{
		accessorKey: "cardType",
		header: "Card Type",
	},
	{
		accessorKey: "isActive",
		header: "Active",
		cell: ({ row }) => (row.original.isActive ? "Yes" : "No"),
	},
	{
		accessorKey: "employeeId",
		header: "Employee Name",
	},
	{
		accessorKey: "createAt",
		header: "Create Time",
	},
	{
		accessorKey: "updateAt",
		header: "Update Time",
	},
	{
		id: "actions",
		enableSorting: false,
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
