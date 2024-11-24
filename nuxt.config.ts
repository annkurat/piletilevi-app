// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		baseURL: process.env.BASE_URL || "/piletilevi-app/",
		buildAssetsDir: "~/assets",
	},
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
});
