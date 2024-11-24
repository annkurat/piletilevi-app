<script lang="ts" setup>
const router = useRouter();
const route = useRoute();

interface Props {
	placeholder: string;
	modelValue: string;
}
const props = defineProps<Props>();
const emit = defineEmits<{
	"update:modelValue": [string];
}>();

const inputValue = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit("update:modelValue", value);
	},
});

const submit = async () => {
	if (inputValue.value.length) {
		return router.push({
			query: { ...route.query, n: inputValue.value },
		});
	}
};
</script>
<template>
	<div class="relative w-full border rounded-md border-gray-200 max-w-xs">
		<input
			v-model="inputValue"
			type="text"
			:placeholder="props.placeholder"
			class="w-full px-4 py-3 pl-3 pr-12 focus:outline-none focus:ring-2 rounded-md focus:ring-primary-blue" />

		<button
			type="button"
			class="absolute border-r border-gray-200 right-12 h-full">
			<Icon
				name="uil:times"
				size="2rem"
				@click.prevent="inputValue = ''"
				class="bg-white cursor-pointer text-gray-400 hover:text-gray-300" />
		</button>
		<button type="button" class="absolute h-full right-3">
			<Icon
				name="material-symbols:search"
				size="1.75rem"
				@click.prevent="submit"
				class="cursor-pointer bg-white text-gray-400 hover:text-gray-300" />
		</button>
	</div>
</template>
