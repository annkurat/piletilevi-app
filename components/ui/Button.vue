<script lang="ts" setup>
interface Props {
	theme?: "primary" | "secondary" | "tertiary";
}
const props = withDefaults(defineProps<Props>(), {
	theme: "primary",
});
</script>
<template>
	<button type="button" :class="`btn btn-${props.theme}`">
		<span class="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
			<slot />
		</span>
	</button>
</template>
<style lang="postcss" scoped>
.btn {
	@apply focus:outline-primary-blue focus:outline-1 focus:outline text-sm transition-all relative isolate inline-flex py-3 items-center justify-center gap-x-2 rounded-md px-5 font-bold;

	&-primary {
		@apply bg-primary-blue text-white hover:bg-black active:bg-primary-blue focus:ring-2 focus:ring-secondary;
	}

	&-secondary {
		@apply border-2 border-primary-blue text-primary-blue focus:border-secondary;
	}

	&-tertiary {
		@apply hover:bg-gray-100 active:ring-1  active:ring-gray-100 focus:ring-2 focus:ring-secondary;
	}
}
</style>
