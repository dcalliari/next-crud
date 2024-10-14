import { Loading } from "@/components/common/loading";
import { CardClient } from "@/components/page-component/card/client";
import { api } from "@/utils/api";
import React from "react";

const Cards = () => {
	const { data, isLoading, isError, error } = api.card.getAll.useQuery();

	if (isLoading) return <Loading />;

	if (isError) return <div>Error: {error.message}</div>;

	return (
		<div className="flex flex-col">
			<div className="flex-1 space-y-4 md:p-8">
				<CardClient data={data} />
			</div>
		</div>
	);
};

export default Cards;
