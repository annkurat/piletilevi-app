<script lang="ts" setup>
interface Props {
	placeholder: string;
}
const props = defineProps<Props>();
</script>
<template>
	<div class="relative mb-4 w-full border rounded-md border-gray-200">
		<input
			type="text"
			:placeholder="props.placeholder"
			class="w-full px-4 py-2.5 focus:outline-none focus:ring-2 rounded-md focus:ring-primary-blue" />
	</div>
</template>
