import {
	type CardColumn,
	cardFormSchema,
	updateCardFormSchema,
} from "@/lib/validators";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { format } from "date-fns";
import { z } from "zod";

export const cardRouter = createTRPCRouter({
	getAll: publicProcedure.query(async ({ ctx }) => {
		const card = await ctx.prisma.card.findMany({
			orderBy: {
				isActive: "desc",
			},
		});

		const employees = await ctx.prisma.employee.findMany();

		const formattedCard: CardColumn[] = card.map((item) => {
			const employee = employees.find((e) => e.id === item.employeeId);
			const employeeName = employee
				? `${employee.firstName} ${employee.lastName}`
				: item.employeeId;
			return {
				id: item.id,
				cardNumber: item.cardNumber,
				cardType: item.cardType,
				isActive: item.isActive,
				createAt: format(item.createAt, "MMMM do, yyyy"),
				updateAt: format(item.updateAt, "MMMM do, yyyy"),
				employeeId: employeeName,
			};
		});
		return formattedCard;
	}),

	getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
		const card = await ctx.prisma.card.findUnique({
			where: { id: input },
		});
		return card;
	}),

	create: publicProcedure
		.input(cardFormSchema)
		.mutation(async ({ ctx, input }) => {
			if (input.isActive) {
				await ctx.prisma.card.updateMany({
					where: { employeeId: input.employeeId },
					data: { isActive: false },
				});
			}
			return await ctx.prisma.card.create({ data: { ...input } });
		}),

	update: publicProcedure
		.input(updateCardFormSchema)
		.mutation(async ({ ctx, input }) => {
			if (input.isActive) {
				await ctx.prisma.card.updateMany({
					where: { employeeId: input.employeeId },
					data: { isActive: false },
				});
			}
			return await ctx.prisma.card.update({
				where: { id: input.id },
				data: { ...input },
			});
		}),

	delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
		return await ctx.prisma.card.delete({
			where: { id: input },
		});
	}),
});
