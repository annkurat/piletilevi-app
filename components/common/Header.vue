<script lang="ts" setup>
const currentCompany = ref("Noorsooteater");
const currentLocale = ref("EN");
const route = useRoute();

const isActive = (path: string) => {
	return route.path === path;
};
</script>
<template>
	<header class="shadow-header px-10 flex items-center">
		<CommonLogo class="mr-14" />
		<nav class="nav font-bold flex gap-x-11">
			<NuxtLink to="/" class="link" exact-active-class="active">
				Back office
				<hr class="hr" :class="{ 'active-hr': route.path === '/' }" />
			</NuxtLink>
			<NuxtLink to="/back-office" class="link" exact-active-class="active">
				Back office
				<hr class="hr" :class="{ 'active-hr': isActive('/back-office') }" />
			</NuxtLink>
			<NuxtLink to="/reports" class="link" exact-active-class="active">
				Reports
				<hr class="hr" :class="{ 'active-hr': isActive('/reports') }" />
			</NuxtLink>
			<NuxtLink to="/help" class="link" exact-active-class="active">
				Help
				<hr class="hr" :class="{ 'active-hr': isActive('/help') }" />
			</NuxtLink>
		</nav>

		<FieldSelect
			v-model="currentLocale"
			class="ml-auto mr-[30px]"
			:options="['EN', 'ET']" />

		<div class="flex gap-2.5 items-center">
			<p class="border-r pr-2.5 border-gray-200">Name Surname</p>
			<FieldSelect
				v-model="currentCompany"
				class="font-bold"
				:options="['Noorsooteater']" />
		</div>
	</header>
</template>
<style lang="postcss" scoped>
.nav {
	.link {
		@apply hover:text-primary-blue transition-all py-7 relative;
	}
	.active {
		@apply text-primary-blue;
	}
	.hr {
		@apply w-0 transition-all rounded-full absolute bottom-0 border-t-4;
	}
	.active-hr {
		@apply w-full;
	}
}
</style>
