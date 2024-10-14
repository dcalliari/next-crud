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

import { AlertModal } from "@/components/common/alert-modal";
import type { CardColumn } from "@/lib/validators";
import { Pencil, Trash2 } from "lucide-react";

interface CellActionProps {
	data: CardColumn;
}

export function CellAction({ data }: CellActionProps) {
	const router = useRouter();
	const [alertModalOpen, setAlertModalOpen] = useState(false);

	const { refetch } = api.card.getAll.useQuery(undefined, {
		enabled: false,
	});

	const { mutate: deleteCard, isLoading: deleteCardIsLoading } =
		api.card.delete.useMutation({
			onError: (err) => {
				toast.error(err.message);
			},
			onSuccess: async (data) => {
				toast.success("Delete Card success");
				await refetch();
			},
		});

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
								router.push(`/cards/${data.id}`);
							}}
						>
							<Pencil className="h-4 w-4 text-foreground" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Update card</p>
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
						<p>Delete card</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<AlertModal
				title="Are you sure?"
				description="This action cannot be undone."
				name={data.cardNumber}
				isOpen={alertModalOpen}
				onClose={() => setAlertModalOpen(false)}
				onConfirm={() => deleteCard(data.id)}
				loading={deleteCardIsLoading}
			/>
		</div>
	);
}
