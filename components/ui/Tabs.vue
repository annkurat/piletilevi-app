<script lang="ts" setup>
import type { Tab } from "~/types";
const route = useRoute();
const router = useRouter();

interface Props {
	tabs: Tab[];
	modelValue?: string;
}
const props = defineProps<Props>();
const emit = defineEmits<{
	"update:modelValue": [string];
}>();

const changeTab = (tab: Tab) => {
	activeTab.value = tab.key;
	const { page, ...otherQueries } = route.query;
	router.push({ query: otherQueries });
};

const activeTab = computed({
	get() {
		return props.modelValue;
	},
	set(value: string) {
		emit("update:modelValue", value);
	},
});
</script>
<template>
	<div class="tabs">
		<ul class="flex border-b gap-x-4 border-gray-200">
			<li
				v-for="tab in props.tabs"
				:key="tab.key"
				class="font-bold pb-2 relative text-gray-400 cursor-pointer hover:text-primary-blue transition-all"
				:class="{ 'text-primary-blue': tab.key === activeTab }"
				@click.prevent="changeTab(tab)">
				{{ tab.label }}
				<hr
					class="w-0 transition-all rounded-full absolute bottom-0 border-t-4"
					:class="{ 'w-full': tab.key === activeTab }" />
			</li>
		</ul>
		<div class="mt-5">
			<slot />
		</div>
	</div>
</template>
