// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "@vueuse/nuxt"],
	css: ["~/assets/css/main.css"],
	runtimeConfig: {
		public: {
			apiUrl: process.env.API_URL || "https://api.intra.piletilevi.ee",
		},
	},
	routeRules: {
		"/*": { cors: true },
	},
	app: {
		baseURL: process.env.BASE_URL || "/piletilevi-app/",
		buildAssetsDir: "~/assets/css",
	},
});
