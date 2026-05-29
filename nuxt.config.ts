// https://nuxt.com/docs/api/configuration/nuxt-config

// Single source of truth for the public site URL.
// The server plugin (server/plugins/feedme.ts) reads this back out of
// runtimeConfig to turn relative content paths into absolute feed links.
const siteUrl = 'https://blog.jaonoctus.dev'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#000000' }
      ],
      link: [
        // Lets readers/feed-readers auto-discover the RSS feed.
        { rel: 'alternate', type: 'application/rss+xml', title: "@jaonoctus' blog", href: '/feed.xml' }
      ]
    }
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/content',
    'nuxt-feedme'
  ],
  nitro: {
    prerender: {
      // Render every page to static HTML at build time. @nuxt/content's
      // production SQLite DB can't be queried in Vercel's read-only
      // serverless filesystem, so a runtime queryCollection() returns an
      // empty post list. Prerendering uses the local DB at build time and
      // serves static HTML from the CDN, sidestepping that entirely.
      // crawlLinks follows the homepage's <NuxtLink>s to prerender each post.
      routes: ['/'],
      crawlLinks: true
    }
  },
  content: {
    build: {
      markdown: {
        // Shiki syntax highlighting (ships with @nuxt/content — no extra deps).
        // 'vitesse-dark' has a #121212 background that matches --bg-soft, so
        // code blocks stay quiet against the black theme while keeping colors.
        highlight: {
          theme: 'vitesse-dark',
          langs: [
            'ts', 'js', 'bash', 'shell', 'json', 'vue',
            'html', 'css', 'markdown', 'diff', 'yaml', 'python', 'rust'
          ]
        }
      }
    }
  },
  feedme: {
    defaults: {
      // The module merges its built-in common defaults AFTER our options
      // (deepmerge(ours, defaults)), so its placeholder `feed.title` would
      // clobber ours. Disable that block and supply its few values below.
      common: false,
      // Don't register the module's default /feed.atom and /feed.json routes —
      // we only want the RSS feed. (The Atom route also 500s here: Atom needs
      // a per-entry <updated> date and the content has none.)
      routes: false
    },
    feeds: {
      // The single feed we expose: RSS 2.0 at /feed.xml.
      routes: {
        '/feed.xml': { type: 'rss2' }
      },
      common: {
        revisit: '6h',
        fixDateFields: true,
        collections: ['content'],
        // Channel-level metadata for the <channel> element.
        // Without this, nuxt-feedme emits its placeholder title and
        // `undefined`/empty link & description.
        feed: {
          id: siteUrl,
          link: siteUrl,
          title: "@jaonoctus' blog",
          description: 'Tenho medo de falar que faço programa e as pessoas pensarem que entendo de computação.',
          language: 'en',
          // The RSS <copyright> field carries the content license.
          copyright: 'jaonoctus, CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)',
          // The feed's own URL — emits the <atom:link rel="self"> element the
          // RSS spec wants (https://validator.w3.org/feed/docs/warning/MissingAtomSelfLink.html).
          // The `feed` library reads `feedLinks.rss` for the rss2 self link.
          feedLinks: {
            rss: `${siteUrl}/feed.xml`
          }
        }
      }
    }
  }
})
