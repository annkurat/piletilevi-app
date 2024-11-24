<script lang="ts" setup>
import type { Discount, TableHeader } from "~/types";
const activeTab = ref("active");
const route = useRoute();
const router = useRouter();
const isCreateNewDiscount = ref(false);
const isEditDiscount = ref(false);
const discounts = ref<Discount[]>([]);
const errorMessage = ref("");
const isLoading = ref(false);
const selectedDiscountTypes = ref([]);
const inputValue = ref((route.query.n as string) || "");

const filters = computed<{ [key: string]: any }>(() => {
	return {
		n: route.query.n || "",
		t: route.query.t?.length
			? route.query.t
			: ["All events", "Event", "Ticket type", "Series"],
	};
});

const discountOptions = Object.entries(DISCOUNT_TYPES).map(([v, l]) => ({
	value: v,
	label: l,
}));

const tabs = computed(() => [
	{
		key: "active",
		label: `Currently active (${currentlyActiveDiscounts.value.length || 0})`,
	},
	{
		key: "upcoming",
		label: `Upcoming (${upcomingDiscounts.value.length || 0})`,
	},
	{
		key: "archived",
		label: `Archived (${archivedDiscounts.value.length || 0})`,
	},
]);

const headers: TableHeader[] = [
	{ text: "Name", value: "name" },
	{ text: "Applies to", value: "category" },
	{ text: "Time period", value: "date" },
	{ text: "Discount amount", value: "discountAmount" },
	{ text: "", value: "actions" },
];

const items = computed(() => {
	switch (activeTab.value) {
		case "upcoming":
			return upcomingDiscounts.value;
		case "archived":
			return archivedDiscounts.value;
		case "active":
		default:
			return currentlyActiveDiscounts.value;
	}
});

const currentlyActiveDiscounts = computed(() => {
	return discounts?.value?.filter((d) => {
		return (
			new Date() >= new Date(d.startDate) && new Date() <= new Date(d.endDate)
		);
	});
});

const upcomingDiscounts = computed(() => {
	return discounts?.value?.filter((d) => {
		return new Date() <= new Date(d.startDate);
	});
});

const archivedDiscounts = computed(() => {
	return discounts?.value?.filter((d) => {
		return new Date() >= new Date(d.endDate);
	});
});

const search = async () => {
	router.push({
		query: {
			...route.query,
			t: selectedDiscountTypes.value,
			n: inputValue.value,
		},
	});
	await fetchDiscounts();
};

const clear = async () => {
	inputValue.value = "";
	selectedDiscountTypes.value = [];
	const { page } = route.query;
	router.push({ path: route.path, query: { page } });
	await fetchDiscounts();
};

const fetchDiscounts = async () => {
	isLoading.value = true;
	await $fetch<Discount[]>("/api/v1/discounts")
		.then((response) => {
			discounts.value = response.filter((d) => {
				return (
					d.name.includes(filters.value.n) &&
					filters.value.t.includes(d.category)
				);
			});
		})
		.catch((error) => {
			errorMessage.value = error;
		})
		.finally(() => {
			isLoading.value = false;
		});
};

await fetchDiscounts();

useHead({
	title: "Back office > Discounts",
});
</script>
<template>
	<CommonBreadcrump />
	<div class="flex justify-between">
		<h2>Discounts</h2>
		<UiButton @click.prevent="isCreateNewDiscount = true">
			CREATE NEW DISCOUNT
		</UiButton>
	</div>
	<div class="mt-4 flex gap-x-5">
		<FieldInputSearch v-model="inputValue" placeholder="Discount name, code" />
		<FieldFilterDropdown
			v-model="selectedDiscountTypes"
			:options="discountOptions" />
		<UiButton theme="secondary" @click.prevent="search">SEARCH</UiButton>
		<UiButton theme="tertiary" @click.prevent="clear">Clear All</UiButton>
	</div>
	<UiTabs :tabs="tabs" v-model="activeTab" class="mt-5">
		<UiLoader v-if="isLoading" />
		<UiTable v-else :headers="headers" :items="items">
			<template #date="{ item }">
				{{ item.startDate }} - {{ item.endDate }}
			</template>
			<template #discountAmount="{ item }">
				{{ item.discountAmount }}€
			</template>
			<template v-if="!['archived'].includes(activeTab)" #actions>
				<button
					@click.prevent="isEditDiscount = true"
					class="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 hover:opacity-75">
					<Icon name="ph:pencil" />
				</button>
			</template>
		</UiTable>
	</UiTabs>

	<UiModal
		:is-open="isCreateNewDiscount"
		title="Create discount"
		@close="isCreateNewDiscount = false">
		<DiscountsCreate />
	</UiModal>
	<UiModal
		:is-open="isEditDiscount"
		title="Edit discount"
		@close="isEditDiscount = false">
		<DiscountsEdit />
	</UiModal>
</template>
