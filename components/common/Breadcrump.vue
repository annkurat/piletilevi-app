<script lang="ts" setup></script>
<template>
	<ol class="flex flex-wrap py-3 mb-4 list-none">
		<li class="breadcrumb-item">Back office</li>
		<li class="breadcrumb-item">Codes</li>
		<li class="breadcrumb-item active">Discounts</li>
	</ol>
</template>
<style lang="postcss" scoped>
.breadcrumb-item.active {
	@apply text-gray-300;
}

.breadcrumb-item + .breadcrumb-item::before {
	@apply inline-block px-2;
	content: ">";
}
</style>
