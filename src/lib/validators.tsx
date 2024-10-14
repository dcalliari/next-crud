import { z } from "zod";

export const employeeFormSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	gender: z.string().min(1),
});

export type EmployeeFormValues = z.infer<typeof employeeFormSchema>;

export const employeeColumn = z.object({
	id: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	gender: z.string(),
	createAt: z.string(),
	updateAt: z.string(),
});

export type EmployeeColumn = z.infer<typeof employeeColumn>;

export const updateEmployeeFormSchema = z.object({
	id: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	gender: z.string(),
});

export const cardFormSchema = z.object({
	cardNumber: z.string().min(1),
	cardType: z.string().min(1),
	isActive: z.boolean(),
	employeeId: z.string().min(1),
});

export type CardFormValues = z.infer<typeof cardFormSchema>;

export const cardColumn = z.object({
	id: z.string(),
	cardNumber: z.string(),
	cardType: z.string(),
	isActive: z.boolean(),
	createAt: z.string(),
	updateAt: z.string(),
	employeeId: z.string(),
});

export type CardColumn = z.infer<typeof cardColumn>;

export const updateCardFormSchema = z.object({
	id: z.string(),
	cardNumber: z.string(),
	cardType: z.string(),
	isActive: z.boolean(),
	employeeId: z.string(),
});
