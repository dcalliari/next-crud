import { AlertModal } from "@/components/common/alert-modal";
import { Heading } from "@/components/common/heading";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { type CardFormValues, cardFormSchema } from "@/lib/validators";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Card } from "@prisma/client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface CardFormProps {
	initialData: Card | null | undefined;
}
export const CardForm = ({ initialData }: CardFormProps) => {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const {
		data: employees,
		isLoading: isEmployeesLoading,
		isError: isEmployeesError,
		error: employeesError,
	} = api.employee.getAll.useQuery();

	const title = initialData ? "Edit card" : "Create card";
	const description = initialData ? "Edit a card" : "Create a new card";
	const toastMessage = initialData
		? "Card updated successfully"
		: "Card created successfully";
	const action = initialData ? "Save Changes" : "Create";

	const form = useForm<CardFormValues>({
		resolver: zodResolver(cardFormSchema),
		defaultValues: initialData || {
			cardNumber: "",
			cardType: "",
			isActive: true,
			employeeId: "",
		},
	});

	const { mutate: createCard } = api.card.create.useMutation({
		onError: (err) => {
			toast.error(err.message);
		},
		onSuccess: (data) => {
			toast.success(toastMessage);
			router.push("/cards");
		},
	});

	const { mutate: updateCard } = api.card.update.useMutation({
		onError: (err) => {
			toast.error(err.message);
		},
		onSuccess: (data) => {
			toast.success(toastMessage);
			router.push("/cards");
		},
	});

	const { mutate: deleteCard, isLoading: deleteCardIsLoading } =
		api.card.delete.useMutation({
			onError: (err) => {
				toast.error(err.message);
			},
			onSuccess: (data) => {
				toast.success(toastMessage);
				router.push("/cards");
			},
		});

	const onSubmit = (values: CardFormValues) => {
		setLoading(true);
		if (initialData) {
			updateCard({ ...values, id: initialData.id });
		} else {
			createCard(values);
		}
		setLoading(false);
	};

	const onDelete = () => {
		deleteCard(initialData?.id as string);
	};

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading title={title} description={description} />
				{initialData && (
					<Button
						disabled={loading}
						variant="destructive"
						size="icon"
						onClick={() => setOpen(true)}
					>
						<Trash className="h-4 w-4" />
					</Button>
				)}
			</div>
			<Separator />

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full space-y-8"
				>
					<div className="grid-cols-3 gap-8 md:grid">
						<FormField
							control={form.control}
							name="cardNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Card Number</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Card Number"
											disabled={loading}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="cardType"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Card Type</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Card Type"
											disabled={loading}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="isActive"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Active</FormLabel>
									<Select
										disabled={loading}
										onValueChange={(value) => field.onChange(value === "true")}
										value={field.value ? "true" : "false"}
										defaultValue={field.value ? "true" : "false"}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value ? "true" : "false"}
													placeholder="Active"
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="true">Yes</SelectItem>
											<SelectItem value="false">No</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="employeeId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Employee</FormLabel>
									<Select
										disabled={loading || isEmployeesLoading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select an employee" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{employees?.map((employee) => (
												<SelectItem key={employee.id} value={employee.id}>
													{employee.firstName} {employee.lastName}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="space-x-4">
						<Button disabled={loading} className="ml-auto" type="submit">
							{action}
						</Button>
						<Button
							disabled={loading}
							className="ml-auto"
							type="button"
							onClick={() => {
								router.back();
							}}
						>
							Cancel
						</Button>
					</div>
				</form>
			</Form>
			<AlertModal
				title="Are you sure?"
				description="This action cannot be undone."
				name={initialData?.cardNumber}
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={deleteCardIsLoading}
			/>
		</>
	);
};
