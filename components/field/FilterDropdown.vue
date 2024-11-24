<script lang="ts" setup>
import type { Option } from "~/types";
const isOpen = ref(false);
const filterDropdownRef = ref();

interface Props {
	options: Option[];
	modelValue: string[];
}
const props = defineProps<Props>();
const emit = defineEmits<{
	"update:modelValue": [string[]];
}>();

const selectedOptions = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit("update:modelValue", value);
	},
});

const toggleOption = (option: string) => {
	const index = selectedOptions.value.indexOf(option);
	if (index === -1) {
		selectedOptions.value.push(option);
	} else {
		selectedOptions.value.splice(index, 1);
	}
};
onClickOutside(filterDropdownRef, () => (isOpen.value = false));
</script>
<template>
	<button
		ref="filterDropdownRef"
		@click.prevent="isOpen = true"
		class="relative flex flex-wrap gap-y-2 py-1.5 items-center w-full border rounded-md border-gray-200 gap-x-1.5 px-3 max-w-sm">
		<Icon name="fe:arrow-down" class="absolute right-3 text-primary-blue" />
		<span
			v-if="selectedOptions.length"
			v-for="selectedOption in selectedOptions"
			class="bg-secondary/10 rounded-full px-3">
			{{ selectedOption }}
		</span>
		<span v-else class="text-gray-300">Applies to</span>
		<Transition
			enter-active-class="transition duration-100 ease-out"
			enter-from-class="transform scale-95 opacity-0"
			enter-to-class="transform scale-100 opacity-100"
			leave-active-class="transition duration-75 ease-out"
			leave-from-class="transform scale-100 opacity-100"
			leave-to-class="transform scale-95 opacity-0">
			<ul
				v-if="isOpen"
				class="shadow-dropdown rounded-md absolute left-0 w-full top-[100%] font-normal bg-white mt-2 overflow-hidden z-10 list-none">
				<li
					v-for="(option, index) in options"
					:key="index"
					class="px-2 py-1.5 flex items-center gap-x-2 hover:bg-gray-100 hover:cursor-pointer"
					@click.prevent="toggleOption(option.label)">
					<span
						class="relative w-5 h-5 flex items-center justify-center border rounded-md border-gray-200 checked:bg-primary-blue"
						:class="{
							'bg-primary-blue': selectedOptions.includes(option.label),
						}">
						<Icon
							v-if="selectedOptions.includes(option.label)"
							name="fa:check"
							size="0.5rem"
							class="text-white" />
					</span>
					<span>{{ option.label }}</span>
				</li>
			</ul>
		</Transition>
	</button>
</template>
