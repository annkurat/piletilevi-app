<script lang="ts" setup>
import type { TableHeader, TableItem } from "~/types";
const router = useRouter();
const route = useRoute();

interface Props {
	items: TableItem[];
	headers: TableHeader[];
}
const props = defineProps<Props>();

const currentPage = computed(() => Number(route.query.page) || 1);
const itemsPerPage = 10;
const totalPages = computed(() => Math.ceil(props.items.length / itemsPerPage));

const items = computed(() => {
	if (props.items.length > 10) {
		return props.items.slice(
			(currentPage.value - 1) * itemsPerPage,
			itemsPerPage * currentPage.value
		);
	} else {
		return props.items;
	}
});

const changePage = (page: number) => {
	return router.push({
		query: { ...route.query, page: page },
	});
};
</script>
<template>
	<table
		class="w-full table shadow-header border border-gray-100 border-spacing-0 rounded-md overflow-hidden">
		<thead>
			<tr>
				<th
					v-for="header in props.headers"
					:key="header.value"
					class="first:pl-5 pt-5 text-left border-b border-gray-200">
					{{ header.text }}
				</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-if="props.items.length"
				v-for="(item, index) in items"
				:key="index"
				class="even:bg-table border-b border-gray-200">
				<td
					v-for="header in headers"
					:key="header.value"
					class="first:text-secondary first:font-bold text-sm py-4 first:pl-5">
					<slot :name="header.value" :item="item">
						{{ item[header.value] }}
					</slot>
				</td>
			</tr>
		</tbody>
	</table>
	<div
		v-if="props.items.length > 10"
		class="text-lg text-secondary gap-x-3 flex font-medium items-center justify-center mt-8">
		<button
			class="pagination-btn mr-1.5"
			@click.prevent="changePage(currentPage - 1)"
			:disabled="currentPage === 1">
			<Icon size="1.25rem" name="oui:arrow-left" />
		</button>
		<button v-if="currentPage !== 1" @click.prevent="changePage(1)">1</button>
		<span v-if="currentPage > 2">...</span>
		<button class="active">{{ currentPage }}</button>
		<span v-if="totalPages - currentPage > 1">...</span>
		<button
			v-if="currentPage !== totalPages"
			@click.prevent="changePage(totalPages)">
			{{ totalPages }}
		</button>
		<button
			class="pagination-btn ml-1.5"
			@click.prevent="changePage(currentPage + 1)"
			:disabled="currentPage === totalPages">
			<Icon size="1.25rem" name="oui:arrow-right" />
		</button>
	</div>
</template>
<style lang="postcss" scoped>
.pagination-btn {
	@apply w-8 h-8 border text-gray-400 rounded-md flex items-center justify-center border-gray-200;
}
.active {
	@apply underline underline-offset-2 text-black font-bold;
}
</style>
