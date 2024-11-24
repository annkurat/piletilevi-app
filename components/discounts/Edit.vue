<script lang="ts" setup>
const selectedTypes = ref([]);

const discountOptions = Object.entries(DISCOUNT_TYPES).map(([v, l]) => ({
	value: v,
	label: l,
}));
</script>
<template>
	<FieldInputText placeholder="Discount name" />
	<div class="flex gap-x-3">
		<FieldFilterDropdown v-model="selectedTypes" :options="discountOptions" />
		<UiButton>EDIT</UiButton>
	</div>
</template>
