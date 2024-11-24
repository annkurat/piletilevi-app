import type { Discount } from "~/types";
export default defineEventHandler(async () => {
	const { apiUrl } = useRuntimeConfig().public;

	const response = await $fetch<Discount[]>(`${apiUrl}/v1/discounts`);
	return response;
});
