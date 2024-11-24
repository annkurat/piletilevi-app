<script lang="ts" setup>
interface Props {
	isOpen: boolean;
	title: string;
}
const props = defineProps<Props>();

const emits = defineEmits<{
	close: [];
}>();
</script>
<template>
	<Transition
		enter-active-class="transition duration-75 ease-out"
		enter-from-class="transform  opacity-0"
		enter-to-class="transform opacity-100"
		leave-active-class="transition duration-75 ease-out"
		leave-from-class="transform opacity-100"
		leave-to-class="transform opacity-0">
		<div
			v-if="props.isOpen"
			class="bg-black/50 z-[1000] absolute top-0 left-0 flex justify-center items-center w-full h-full">
			<div class="bg-white max-w-md w-full rounded-lg">
				<div class="text-2xl font-bold font-roboto px-8 py-6 flex">
					<h3>{{ props.title }}</h3>
					<button type="button" class="ml-auto">
						<Icon
							name="uil:times"
							size="2rem"
							@click.prevent="emits('close')"
							class="bg-white cursor-pointer text-gray-400 hover:text-gray-300" />
					</button>
				</div>
				<div class="px-8 pt-5 pb-10">
					<slot />
				</div>
			</div>
		</div>
	</Transition>
</template>
