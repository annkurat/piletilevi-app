<script lang="ts" setup>
const isOpen = ref(false);
const selectRef = ref(null);

interface Props {
	options: string[];
	modelValue: string;
}
const props = defineProps<Props>();
const emit = defineEmits<{
	"update:modelValue": [string];
}>();

const selectedValue = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit("update:modelValue", value);
	},
});

onClickOutside(selectRef, () => {
	isOpen.value = false;
});
</script>
<template>
	<div
		ref="selectRef"
		class="relative hover:cursor-pointer"
		@click.prevent="isOpen = !isOpen">
		<div class="selected flex gap-x-2 items-center">
			<p>{{ selectedValue }}</p>
			<Icon name="fe:arrow-down" />
		</div>
		<Transition
			enter-active-class="transition duration-100 ease-out"
			enter-from-class="transform scale-95 opacity-0"
			enter-to-class="transform scale-100 opacity-100"
			leave-active-class="transition duration-75 ease-out"
			leave-from-class="transform scale-100 opacity-100"
			leave-to-class="transform scale-95 opacity-0">
			<ul
				v-if="isOpen"
				class="shadow-dropdown rounded-md absolute left-0 top-[100%] font-normal bg-white mt-2 overflow-hidden z-10 list-none">
				<li
					v-for="option in props.options"
					:key="option"
					class="hover:bg-gray-100 hover:cursor-pointer px-2.5 py-2"
					@click.prevent="selectedValue = option">
					{{ option }}
				</li>
			</ul>
		</Transition>
	</div>
</template>
