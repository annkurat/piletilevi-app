// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "@vueuse/nuxt"],
	css: ["~/assets/css/main.css"],
	runtimeConfig: {
		public: {
			apiUrl: process.env.API_URL || "https://api.intra.piletilevi.ee",
		},
	},

	app: {
		baseURL: "/piletilevi-app/",
		buildAssetsDir: "~/assets/css",
	},
});
