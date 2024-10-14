"use client";
import { Heading } from "@/components/common/heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Separator } from "@/components/ui/separator";
import type { EmployeeColumn } from "@/lib/validators";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useSession } from "next-auth/react";
import { columns } from "./columns";

interface EmployeeClientProps {
	data: EmployeeColumn[];
}
export const EmployeeClient = ({ data }: EmployeeClientProps) => {
	const { data: session } = useSession();
	const router = useRouter();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title="Employee (CRUD)"
					description="Manage employee for you business"
				/>
				{session && (
					<Button
						onClick={() => {
							router.push("/employees/new");
						}}
					>
						<Plus className="mr-2 h-4 w-4" /> Add New
					</Button>
				)}
			</div>
			<Separator />
			<div>
				<DataTable columns={columns} data={data} />
			</div>
		</>
	);
};
