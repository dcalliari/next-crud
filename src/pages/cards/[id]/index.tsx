import { Loading } from "@/components/common/loading";
import { CardForm } from "@/components/page-component/card/card-form";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import React from "react";

const Card = () => {
	const router = useRouter();
	const { id } = router.query;

	if (typeof id !== "string") {
		return <Loading />;
	}

	const { data: card, isLoading } = api.card.getById.useQuery(id);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className="flex flex-col">
			<div className="flex-1 space-y-4 p-4 md:p-8">
				<CardForm initialData={card} />
			</div>
		</div>
	);
};

export default Card;
