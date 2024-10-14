"use client";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { AlertModal } from "@/components/common/alert-modal";
import type { EmployeeColumn } from "@/lib/validators";
import { Pencil, Trash2 } from "lucide-react";

interface CellActionProps {
	data: EmployeeColumn;
}

export function CellAction({ data }: CellActionProps) {
	const { data: session } = useSession();
	const router = useRouter();
	const [alertModalOpen, setAlertModalOpen] = useState(false);

	const { refetch } = api.employee.getAll.useQuery(undefined, {
		enabled: false,
	});

	const { mutate: deleteEmployee, isLoading: deleteEmployeeIsLoading } =
		api.employee.delete.useMutation({
			onError: (err) => {
				toast.error(err.message);
			},
			onSuccess: async (data) => {
				toast.success("Delete Employee success");
				await refetch();
			},
		});

	if (!session) {
		return null;
	}

	return (
		<div className="flex justify-center space-x-2">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="hover:bg-secondary"
							onClick={() => {
								router.push(`/employees/${data.id}`);
							}}
						>
							<Pencil className="h-4 w-4 text-foreground" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Update employee</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="hover:bg-secondary"
							onClick={() => {
								setAlertModalOpen(true);
							}}
						>
							<Trash2 className="h-4 w-4 text-foreground" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Delete employee</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<AlertModal
				title="Are you sure?"
				description="This action cannot be undone."
				name={data.firstName}
				isOpen={alertModalOpen}
				onClose={() => setAlertModalOpen(false)}
				onConfirm={() => deleteEmployee(data.id)}
				loading={deleteEmployeeIsLoading}
			/>
		</div>
	);
}
