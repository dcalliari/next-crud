"use client";

import { Heading } from "@/components/common/heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Separator } from "@/components/ui/separator";
import type { CardColumn } from "@/lib/validators";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { columns } from "./columns";

interface CardClientProps {
	data: CardColumn[];
}
export const CardClient = ({ data }: CardClientProps) => {
	const router = useRouter();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title="Benefit Card (CRUD)"
					description="Manage Benefit Cards for you business"
				/>
				<Button
					onClick={() => {
						router.push("/cards/new");
					}}
				>
					<Plus className="mr-2 h-4 w-4" /> Add New
				</Button>
			</div>
			<Separator />
			<div>
				<DataTable columns={columns} data={data} />
			</div>
		</>
	);
};
