// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      title: 'reas - Simplifying academic citations',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Academic reference list builder with Harvard formatting' },

        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'reas - Simplifying academic citations' },
        { property: 'og:description', content: 'Manage academic citations seamlessly. Create and download formatted reference lists' },
        { property: 'og:image', content: '/reas_og.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'reas - Simplifying academic citations' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'reas - Simplifying academic citations' },
        { name: 'twitter:description', content: 'Manage academic citations seamlessly. Create and format references in Harvard, APA, and MLA styles.' },
        { name: 'twitter:image', content: '/reas_og.png' },
        { name: 'twitter:image:alt', content: 'reas - Simplifying academic citations' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Crimson+Pro:wght@400;500;600;700&display=swap' }
      ]
    }
  }
})
